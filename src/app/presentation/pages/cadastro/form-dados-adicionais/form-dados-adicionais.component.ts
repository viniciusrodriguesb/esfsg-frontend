import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
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
import { InscricaoMenorRequestDto } from '../../../../core/application/dto/request/inscricao-menor-request.dto';

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
      this.preencherFormulario(this.inscricaoUsuario);
    }

    this.buscarRegiao();
    this.buscarCondicaoMedica();
    this.buscarIgrejas();
  }

  private preencherObjetoInscricao() {
    const formValue = this.formDadosAdicionais.value;

    this.inscricaoUsuario = {
      ...this.inscricaoUsuario,
      usuario: {
        ...this.inscricaoUsuario?.usuario,
        idIgreja: formValue.igreja ? parseInt(formValue.igreja) : undefined,
      },
      igreja: {
        idRegiao: formValue.idRegiaoIgrejaNova
          ? parseInt(formValue.idRegiaoIgrejaNova)
          : undefined,
        nome: formValue.nomeIgrejaNova || undefined,
        pastor: formValue.pastorIgrejaNova || undefined,
      },
      inscricaoMenor: Array.isArray(formValue.inscricaoMenor)
        ? formValue.inscricaoMenor.map((menor: any) => ({
            idade: menor.idade,
            nome: menor.nome,
            idCondicaoMedica: menor.idCondicaoMedica,
          }))
        : [],
    };
  }

  preencherFormulario(dados: InscricaoRequestDto): void {
    this.formDadosAdicionais.patchValue({
      igreja: dados.usuario?.idIgreja?.toString() || '',
      idRegiaoIgrejaNova: dados.igreja?.idRegiao?.toString() || '',
      nomeIgrejaNova: dados.igreja?.nome || '',
      pastorIgrejaNova: dados.igreja?.pastor || '',
    });

    const menores: Array<InscricaoMenorRequestDto> = dados.inscricaoMenor ?? [];

    if (Array.isArray(menores) && menores.length > 0) {
      const formArray = this.formDadosAdicionais.get(
        'inscricaoMenor'
      ) as FormArray;
      formArray.clear();
      menores.forEach((menor) => {
        formArray.push(
          this._formBuilder.group({
            idade: [menor.idade ?? ''],
            nome: [menor.nome ?? ''],
            idCondicaoMedica: [menor.idCondicaoMedica ?? ''],
          })
        );
      });
    }
  }

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

  validarFormArrayComTodosObrigatorios(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const array = formArray as FormArray;
      const invalido = array.controls.some(
        (control) => !control.value || control.invalid
      );
      return invalido ? { campoObrigatorioNoArray: true } : null;
    };
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

  public exibirCamposIgrejaNova() {
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
    this.preencherObjetoInscricao();
    localStorage.setItem(
      ParametroStorageEnum.FORM_INSCRICAO,
      JSON.stringify(this.inscricaoUsuario)
    );

    this.router.navigate([Rotas.CADASTRO, Rotas.CONFIRMACAO_DADOS_CADASTRO]);
  }

  voltar() {
    console.log('entrou');
    
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_EVENTO]);
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
