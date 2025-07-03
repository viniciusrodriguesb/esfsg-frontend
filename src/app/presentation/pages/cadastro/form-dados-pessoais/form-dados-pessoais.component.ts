import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { BuscarCondicaoMedicaUseCase } from '../../../../core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { ResumoInscricaoDto } from '../../../../core/application/dto/resumo-inscricao.dto';
import moment from 'moment';

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
    nascimento: ['', [this.dataNascimentoValidator]],
    email: ['', [Validators.email]],
    condicoesMedicas: this._formBuilder.array([this._formBuilder.control('')]),
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
  resumoInscricao: ResumoInscricaoDto;

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
    this.resumoInscricao = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.RESUMO_INSCRICAO)
    ) as ResumoInscricaoDto;

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

  preencherArrayCondicoesMedicas(condicoes: number[]) {
    this.resumoInscricao.usuario.condicaoMedica = [];
    condicoes.forEach((idCondicao) => {
      const condicao = this.opcoesCondicoes.find(
        (c) => c.id === idCondicao
      ).descricao;
      if (condicao) {
        this.resumoInscricao.usuario.condicaoMedica.push(condicao);
      }
    });
  }

  preencherArrayFuncoesIgreja(funcoes: number[]) {
    this.resumoInscricao.usuario.funcoesIgreja = [];
    funcoes.forEach((idFuncao) => {
      const funcao = this.opcoesFuncoes.find(
        (f) => f.id === idFuncao
      ).descricao;
      if (funcao) {
        this.resumoInscricao.usuario.funcoesIgreja.push(funcao);
      }
    });
  }

  prosseguir() {
    this.preencherObjetoInscricao();
    this.preencherObjetoResumoInscricao();

    localStorage.setItem(
      ParametroStorageEnum.FORM_INSCRICAO,
      JSON.stringify(this.inscricaoUsuario)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_INICIAL]);
  }

  private formatarDataParaISO(dataStr: string): string {
    const dia = dataStr.slice(0, 2);
    const mes = dataStr.slice(2, 4);
    const ano = dataStr.slice(4, 8);

    const data = new Date(+ano, +mes - 1, +dia);
    return data.toISOString();
  }

  private preencherObjetoInscricao() {
    this.inscricaoUsuario.usuario.telefone =
      this.formDadosPessoais.get('telefone').value;
    if (this.formDadosPessoais.get('email').value) {
      this.inscricaoUsuario.usuario.email =
        this.formDadosPessoais.get('email').value;
    }
    this.inscricaoUsuario.usuario.nomeCompleto =
      this.formDadosPessoais.get('nomeCompleto').value;
    this.inscricaoUsuario.usuario.nascimento = this.formatarDataParaISO(
      this.formDadosPessoais.get('nascimento').value
    );

    const condicoes = this.formDadosPessoais.get('condicoesMedicas')?.value;
    if (condicoes.some((v) => v && v !== '')) {
      this.inscricaoUsuario.usuario.condicoesMedicas = condicoes.map(
        (v: string) => Number(v)
      );
    }

    this.inscricaoUsuario.usuario.funcoesIgreja = this.formDadosPessoais
      .get('funcoesIgreja')
      .value.map((v: string) => Number(v));
  }

  private preencherObjetoResumoInscricao() {
    const condicoes = this.formDadosPessoais.get('condicoesMedicas')?.value;
    if (condicoes.some((v) => v && v !== '')) {
      this.preencherArrayCondicoesMedicas(
        condicoes.map((v: string) => Number(v))
      );
    }

    this.preencherArrayFuncoesIgreja(
      this.formDadosPessoais
        .get('funcoesIgreja')
        .value.map((v: string) => Number(v))
    );

    this.resumoInscricao.usuario.cpf = this.inscricaoUsuario.usuario.cpf;
    this.resumoInscricao.usuario.nome =
      this.inscricaoUsuario.usuario.nomeCompleto;
    this.resumoInscricao.usuario.telefone =
      this.inscricaoUsuario.usuario.telefone;
    this.resumoInscricao.usuario.dataNascimento =
      this.inscricaoUsuario.usuario.nascimento;
    this.resumoInscricao.usuario.email = this.inscricaoUsuario.usuario.email;

    localStorage.setItem(
      ParametroStorageEnum.RESUMO_INSCRICAO,
      JSON.stringify(this.resumoInscricao)
    );
  }

  preencherFormulario(dados: any): void {
    this.formDadosPessoais.patchValue({
      cpf: dados.cpf || '',
      nomeCompleto: dados.usuario?.nomeCompleto || '',
      telefone: dados.usuario?.telefone || '',
      nascimento: moment(dados.usuario?.nascimento || '').format('DDMMYYYY'),
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
    return this.formDadosPessoais.get('condicoesMedicas') as FormArray;
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
    return this.formDadosPessoais.get('funcoesIgreja') as FormArray;
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

  dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
    const dataStr = control.value;

    if (!dataStr || dataStr.length !== 8) {
      return { dataInvalida: 'Data deve ter 8 dígitos no formato ddMMyyyy' };
    }

    const dia = Number(dataStr.substring(0, 2));
    const mes = Number(dataStr.substring(2, 4));
    const ano = Number(dataStr.substring(4, 8));

    // Verifica se os valores são números válidos
    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
      return { dataInvalida: 'Data contém valores inválidos' };
    }

    const data = new Date(ano, mes - 1, dia);

    // Verifica se a data construída bate com os valores (exemplo: 31/02/2020 é inválido)
    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    ) {
      return { dataInvalida: 'Data inválida' };
    }

    // Data mínima e máxima
    const dataMinima = new Date(1900, 0, 1);
    const dataMaxima = new Date();
    dataMaxima.setHours(0, 0, 0, 0); // só data, sem hora

    if (data < dataMinima) {
      return { dataInvalida: 'Data menor que 01/01/1900' };
    }

    if (data > dataMaxima) {
      return { dataInvalida: 'Data maior que hoje' };
    }

    return null;
  }
}
