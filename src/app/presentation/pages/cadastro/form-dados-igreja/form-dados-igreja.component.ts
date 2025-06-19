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
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { Router } from '@angular/router';
import { BuscarInstrumentoUseCase } from '../../../../core/application/use-cases/instrumento/buscar-instrumento.usecase';
import { NomePipe } from '../../../pipes/nome.pipe';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';

@Component({
  selector: 'app-form-dados-igreja',
  standalone: false,
  templateUrl: './form-dados-igreja.component.html',
  styleUrl: './form-dados-igreja.component.scss',
})
export class FormDadosIgrejaComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosIgreja = this._formBuilder.group({
    classe: ['', Validators.required],
    dons: ['', Validators.required],
    pcd: ['', Validators.required],
    instrumentos: this._formBuilder.array([this._formBuilder.control('')]),
  });

  formSubmetido = false;

  classes: TabelaDominioResponseDto[] = [];
  igrejas: TabelaDominioResponseDto[] = [];
  opcoesInstrumentos: TabelaDominioResponseDto[] = [];
  opcoesBooleanas: TabelaDominioResponseDto[] = [
    { id: 1, descricao: 'Sim' },
    { id: 2, descricao: 'Não' },
  ];
  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];
  periodos: TabelaDominioResponseDto[] = [
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  exibeInfoVisita = false;
  inscricaoUsuario: InscricaoRequestDto;

  constructor(
    private readonly buscarClasseUsecase: BuscarClasseUseCase,
    private readonly router: Router,
    private readonly buscarInstrumentosUsecase: BuscarInstrumentoUseCase,
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)
    ) as InscricaoRequestDto;

    if (this.inscricaoUsuario) {
      this.preencherFormulario(this.inscricaoUsuario);
    }

    this.buscarClasse();
    this.buscarInstrumentos();
    this.buscarFuncaoEvento();
  }

  public exibirCamposVisita(evento: any) {
    if (evento == 1) {
      this.exibeInfoVisita = true;
    } else {
      this.exibeInfoVisita = false;
    }
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase
      .execute(this.inscricaoUsuario.idEvento)
      .subscribe({
        next: (resultado) => {
          this.opcoesFuncaoEvento = this.formatarNomes(resultado);
        },
        error: () => {},
      });
  }
  public buscarInstrumentos() {
    this.buscarInstrumentosUsecase.execute().subscribe({
      next: (instrumentos) => {
        if (!instrumentos || instrumentos.length === 0) {
          console.error('Nenhum instrumento encontrado.');
        } else {
          this.opcoesInstrumentos = this.formatarNomes(instrumentos);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public buscarClasse() {
    this.buscarClasseUsecase.execute().subscribe({
      next: (classes) => {
        this.classes = this.formatarNomes(classes);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  prosseguir() {
    this.preencherObjetoInscricao();
    localStorage.setItem(
      ParametroStorageEnum.FORM_INSCRICAO,
      JSON.stringify(this.inscricaoUsuario)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_EVENTO]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }

  // Getter do FormArray completo — para adicionar e remover
  get instrumentosFormArray(): FormArray {
    return this.formDadosIgreja.get('instrumentos') as FormArray;
  }

  // Getter apenas dos controles — para uso no template
  get instrumentos(): FormControl[] {
    return this.instrumentosFormArray.controls as FormControl[];
  }

  adicionarInstrumento() {
    this.instrumentosFormArray.push(
      this._formBuilder.control('', Validators.required)
    );
  }

  removerInstrumento(index: number) {
    this.instrumentosFormArray.removeAt(index);
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }

  private preencherObjetoInscricao() {
    const formValue = this.formDadosIgreja.value;

    this.inscricaoUsuario = {
      ...this.inscricaoUsuario,
      usuario: {
        ...this.inscricaoUsuario.usuario,
        idClasse: parseInt(formValue.classe ?? ''),
        dons: formValue.dons == '1',
        pcd: formValue.pcd ?? '',
        instrumentos: Array.isArray(formValue.instrumentos)
          ? formValue.instrumentos.filter((i) => i !== '').map((i) => Number(i))
          : [],
      }
    };
  }

  preencherFormulario(dados: InscricaoRequestDto): void {
    this.formDadosIgreja.patchValue({
      classe: dados.usuario?.idClasse?.toString() || '',
      dons: dados.usuario?.dons ? '1' : '2',
      pcd: dados.usuario?.pcd || '',
    });

    this.setFormArrayValues(
      'instrumentos',
      Array.isArray(dados.usuario?.instrumentos)
        ? dados.usuario.instrumentos.map((i) => i?.toString())
        : []
    );

    if(this.formDadosIgreja.get('visitas')?.value === '1') {
      this.exibeInfoVisita = true;
    }
  }

  setFormArrayValues(nomeCampo: string, valores: any[]): void {
    const formArray = this.formDadosIgreja.get(nomeCampo) as FormArray;
    formArray.clear();

    if (Array.isArray(valores) && valores.length > 0) {
      valores.forEach((valor) =>
        formArray.push(this._formBuilder.control(valor, Validators.required))
      );
    } else {
      formArray.push(this._formBuilder.control('', Validators.required));
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
}
