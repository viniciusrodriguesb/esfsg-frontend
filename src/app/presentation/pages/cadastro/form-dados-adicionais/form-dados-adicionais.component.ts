import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarCondicaoMedicaUseCase } from '../../../../core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { BuscarRegiaoUseCase } from '../../../../core/application/use-cases/regiao/buscar-regiao.usecase';
import { BuscarIgrejaUseCase } from '../../../../core/application/use-cases/igreja/buscar-classe.usecase';

@Component({
  selector: 'app-form-dados-adicionais',
  standalone: false,
  templateUrl: './form-dados-adicionais.component.html',
  styleUrl: './form-dados-adicionais.component.scss',
})
export class FormDadosAdicionaisComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosAdicionais = this._formBuilder.group({
    igreja: ['', Validators.required],
    idRegiaoIgrejaNova: [''],
    nomeIgrejaNova: [''],
    pastorIgrejaNova: [''],
    inscricaoMenor: this._formBuilder.array([this.criarInscricaoMenor()]),
  });

  opcoesBoleanas: TabelaDominioResponseDto[] = [
    { id: 1, descricao: 'Sim' },
    { id: 2, descricao: 'Não' },
  ];

  formSubmetido = false;
  opcoesCondicoes: TabelaDominioResponseDto[] = [];
  opcoesFuncoes: TabelaDominioResponseDto[] = [];
  validacaoFilhos = true;
  inscricaoUsuario: InscricaoRequestDto;
  igrejas: TabelaDominioResponseDto[] = [];

  regioes: TabelaDominioResponseDto[] = [];
  exibeCamposNovaIgreja: boolean = false;

  constructor(
    private readonly buscarCondicaoMedicaUsecase: BuscarCondicaoMedicaUseCase,
    private readonly buscarFuncaoIgrejasUsecase: BuscarFuncaoIgrejaUseCase,
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarIgrejaUsecase: BuscarIgrejaUseCase,
    private readonly router: Router,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)
    ) as InscricaoRequestDto;

    if (this.inscricaoUsuario) {
      //this.preencherFormulario(this.inscricaoUsuario);
    }

    this.buscarRegiao();
    this.buscarCondicaoMedica();
    this.buscarIgrejas();
  }

  public buscarIgrejas() {
    this.buscarIgrejaUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.igrejas = this.formatarNomes(resposta);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar igrejas:', erro);
      },
    });
  }

  public exibirCamposIgrejaNova(){
    this.exibeCamposNovaIgreja = true;
  }

  public buscarRegiao() {
    this.buscarRegiaoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.regioes = this.formatarNomes(resposta);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar regiões:', erro);
      },
    });
  }

  public buscarFuncoesIgrejas() {
    this.buscarFuncaoIgrejasUsecase.execute().subscribe({
      next: (resultado) => {
        this.opcoesFuncoes = this.formatarNomes(resultado);
        console.log(resultado);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public buscarCondicaoMedica() {
    this.buscarCondicaoMedicaUsecase.execute().subscribe({
      next: (resultado) => {
        this.opcoesCondicoes = this.formatarNomes(resultado);
      },
      error: () => {},
    });
  }

  prosseguir() {
    // this.preencherObjetoInscricao();
    localStorage.setItem(
      ParametroStorageEnum.FORM_INSCRICAO,
      JSON.stringify(this.inscricaoUsuario)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  voltar() {
    this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
  }

  // private preencherObjetoInscricao() {
  //   this.inscricaoUsuario.usuario.telefone =
  //     this.formDadosAdicionais.get('telefone').value;
  //   this.inscricaoUsuario.usuario.email =
  //     this.formDadosAdicionais.get('email').value;
  //   this.inscricaoUsuario.usuario.nomeCompleto =
  //     this.formDadosAdicionais.get('nomeCompleto').value;
  //   this.inscricaoUsuario.usuario.nascimento =
  //     this.formDadosAdicionais.get('nascimento').value;
  //   this.inscricaoUsuario.usuario.condicoesMedicas = this.formDadosAdicionais
  //     .get('condicoesMedicas')
  //     .value.map((v: string) => Number(v));
  //   this.inscricaoUsuario.usuario.funcoesIgreja = this.formDadosAdicionais
  //     .get('funcoesIgreja')
  //     .value.map((v: string) => Number(v));
  // }

  // preencherFormulario(dados: any): void {
  //   this.formDadosAdicionais.patchValue({
  //     cpf: dados.cpf || '',
  //     nomeCompleto: dados.usuario?.nomeCompleto || '',
  //     telefone: dados.usuario?.telefone || '',
  //     nascimento: dados.usuario?.nascimento || '',
  //     email: dados.usuario?.email || '',
  //   });

  //   this.setFormArrayValues( 'condicoesMedicas', dados.usuario?.condicoesMedicas);
  //   this.setFormArrayValues('funcoesIgreja', dados.usuario?.funcoesIgreja);
  // }

  setFormArrayValues(nomeCampo: string, valores: any[]): void {
    const formArray = this.formDadosAdicionais.get(nomeCampo) as FormArray;
    formArray.clear();

    if (Array.isArray(valores) && valores.length > 0) {
      valores.forEach((valor) =>
        formArray.push(this._formBuilder.control(valor))
      );
    } else {
      formArray.push(this._formBuilder.control(''));
    }
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }

  criarInscricaoMenor(): FormGroup {
    return this._formBuilder.group({
      idade: [''],
      nome: [''],
      idCondicaoMedica: [''],
    });
  }

  getFormControl(group: FormGroup, controlName: string): FormControl {
    return group.get(controlName) as FormControl;
  }

  get inscricaoMenorFormArray(): FormArray {
    return this.formDadosAdicionais.get('inscricaoMenor') as FormArray;
  }

  get menores(): FormGroup[] {
    return this.inscricaoMenorFormArray.controls as FormGroup[];
  }

  adicionarInscricaoMenor() {
    this.inscricaoMenorFormArray.push(this.criarInscricaoMenor());
  }

  removerInscricaoMenor(index: number) {
    this.inscricaoMenorFormArray.removeAt(index);
  }
}
