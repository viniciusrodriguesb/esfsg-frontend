import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { BuscarInstrumentoUseCase } from '../../../../core/application/use-cases/instrumento/buscar-instrumento.usecase';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { NomePipe } from '../../../pipes/nome.pipe';

@Component({
  selector: 'app-form-dados-evento',
  standalone: false,
  templateUrl: './form-dados-evento.component.html',
  styleUrl: './form-dados-evento.component.scss',
})
export class FormDadosEventoComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosEvento = this._formBuilder.group({
    funcaoEvento: ['', Validators.required],
    periodo: ['', Validators.required],
    visitas: [''],
    carro: [''],
    quantidadeVagas: [''],
  });

  formSubmetido = false;
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
    private readonly router: Router,
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

    this.buscarFuncaoEvento();
    console.log('evento form',this.formDadosEvento.value);
    
  }

  private preencherObjetoInscricao() {
    const formValue = this.formDadosEvento.value;

    this.inscricaoUsuario = {
      ...this.inscricaoUsuario,
      idFuncaoEvento: parseInt(formValue.funcaoEvento ?? ''),
      periodo: formValue.periodo ?? '',
      visita: {
        visita: formValue.visitas == '1',
        carro: formValue.carro == '1',
        vagas: parseInt(formValue.quantidadeVagas ?? ''),
      },
    };
  }

  preencherFormulario(dados: InscricaoRequestDto): void {
    this.formDadosEvento.patchValue({
      funcaoEvento: dados.idFuncaoEvento?.toString() || '',
      periodo: dados.periodo || '',
      visitas: dados.visita?.visita ? '1' : '2',
      carro: dados.visita?.carro ? '1' : '2',
      quantidadeVagas: dados.visita?.vagas?.toString() || '',
    });

    if (this.formDadosEvento.get('visitas')?.value === '1') {
      this.exibeInfoVisita = true;
    }
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

  prosseguir() {
    this.preencherObjetoInscricao();
    localStorage.setItem(
      ParametroStorageEnum.FORM_INSCRICAO,
      JSON.stringify(this.inscricaoUsuario)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_ADICIONAIS]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }
}
