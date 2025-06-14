import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { BuscarInstrumentoUseCase } from '../../../../core/application/use-cases/instrumento/buscar-instrumento.usecase';
import { NomePipe } from '../../../pipes/nome.pipe';
import { BuscarCondicaoMedicaUseCase } from '../../../../core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';

@Component({
  selector: 'app-form-dados-pessoais',
  standalone: false,
  templateUrl: './form-dados-pessoais.component.html',
  styleUrl: './form-dados-pessoais.component.scss',
})
export class FormDadosPessoaisComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosPessoais = this._formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    nomeCompleto: ['', Validators.required],
    telefone: ['', Validators.required],
    nascimento: ['', Validators.required],
    email: ['', [Validators.email]],
    condicoesMedicas: this._formBuilder.array(
      [this._formBuilder.control('', Validators.required)],
      [this.validarFormArrayComTodosObrigatorios()]
    ),
    funcoesIgreja: this._formBuilder.array(
      [this._formBuilder.control('', Validators.required)],
      [this.validarFormArrayComTodosObrigatorios()]
    ),
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

  constructor(
    private readonly buscarCondicaoMedicaUsecase: BuscarCondicaoMedicaUseCase,
    private readonly buscarFuncaoIgrejasUsecase: BuscarFuncaoIgrejaUseCase,
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

    this.buscarCondicaoMedica();
    this.buscarFuncoesIgrejas();
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
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  voltar() {
    console.log(this.formDadosPessoais.valid);

    // this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
  }

  private preencherObjetoInscricao() {
    this.inscricaoUsuario.usuario.telefone =
      this.formDadosPessoais.get('telefone').value;
    this.inscricaoUsuario.usuario.email =
      this.formDadosPessoais.get('email').value;
    this.inscricaoUsuario.usuario.nomeCompleto =
      this.formDadosPessoais.get('nomeCompleto').value;
    this.inscricaoUsuario.usuario.nascimento =
      this.formDadosPessoais.get('nascimento').value;
    this.inscricaoUsuario.usuario.condicoesMedicas = this.formDadosPessoais
      .get('condicoesMedicas')
      .value.map((v: string) => Number(v));
    this.inscricaoUsuario.usuario.funcoesIgreja = this.formDadosPessoais
      .get('funcoesIgreja')
      .value.map((v: string) => Number(v));
  }

  preencherFormulario(dados: any): void {
    this.formDadosPessoais.patchValue({
      cpf: dados.cpf || '',
      nomeCompleto: dados.usuario?.nomeCompleto || '',
      telefone: dados.usuario?.telefone || '',
      nascimento: dados.usuario?.nascimento || '',
      email: dados.usuario?.email || '',
    });

    this.setFormArrayValues(
      'condicoesMedicas',
      dados.usuario?.condicoesMedicas
    );
    this.setFormArrayValues('funcoesIgreja', dados.usuario?.funcoesIgreja);
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

  setFormArrayValues(nomeCampo: string, valores: any[]): void {
    const formArray = this.formDadosPessoais.get(nomeCampo) as FormArray;
    formArray.clear();

    if (Array.isArray(valores) && valores.length > 0) {
      valores.forEach((valor) =>
        formArray.push(this._formBuilder.control(valor))
      );
    } else {
      formArray.push(this._formBuilder.control(''));
    }
  }

  get condicoesMedicasFormArray(): FormArray {
    return this.formDadosPessoais.get('funcoesIgreja') as FormArray;
  }

  get condicoesMedicas(): FormControl[] {
    return this.condicoesMedicasFormArray.controls as FormControl[];
  }

  adicionarCondicaoMedica() {
    this.condicoesMedicasFormArray.push(
      this._formBuilder.control('', Validators.required)
    );
  }

  removerCondicaoMedica(index: number) {
    this.condicoesMedicasFormArray.removeAt(index);
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }

  get funcoesIgrejaFormArray(): FormArray {
    return this.formDadosPessoais.get('condicoesMedicas') as FormArray;
  }

  get funcoesIgreja(): FormControl[] {
    return this.funcoesIgrejaFormArray.controls as FormControl[];
  }

  adicionarFuncaoIgreja() {
    this.funcoesIgrejaFormArray.push(
      this._formBuilder.control('', Validators.required)
    );
  }

  removerFuncaoIgreja(index: number) {
    this.funcoesIgrejaFormArray.removeAt(index);
  }
}
