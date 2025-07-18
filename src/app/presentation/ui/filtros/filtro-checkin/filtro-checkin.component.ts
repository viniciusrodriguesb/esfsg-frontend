import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BuscarParticipantesCheckinUseCase } from '../../../../core/application/use-cases/checkin/buscar-participantes-checkin.usecase';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { CheckinResponseDto } from '../../../../core/application/dto/response/checkin-response-response.dto';
import { PageEvent } from '@angular/material/paginator';
import { CheckinRequestDto } from '../../../../core/application/dto/request/checkin-request.dto';

@Component({
  selector: 'app-filtro-checkin',
  standalone: false,
  templateUrl: './filtro-checkin.component.html',
  styleUrl: './filtro-checkin.component.scss',
})
export class FiltroCheckinComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<FiltroCheckinComponent>>(MatBottomSheetRef);
  private readonly _formBuilder = inject(FormBuilder);

  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];
  checkin: CheckinResponseDto;
  exibicaoListaParticipantes: boolean = false;

  statusCheckin: TabelaDominioResponseDto[] = [
    { id: 0, descricao: 'Selecione' },
    { id: 1, descricao: 'Presente' },
    { id: 2, descricao: 'Ausente' },
  ];

  periodos: TabelaDominioResponseDto[] = [
    { id: 0, descricao: 'Selecione' },
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  formCheckin = this._formBuilder.group({
    funcaoEvento: [''],
    periodo: [''],
    status: [''],
    nome: [''],
    evento: [''],
  });

  constructor(
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly buscarParticipantesCheckinUsecase: BuscarParticipantesCheckinUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarFuncaoEvento();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  fechar(): void {
    this._bottomSheetRef.dismiss();
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(1).subscribe({
      next: (resultado) => {
        const funcoesFormatadas = this.formatarNomes(resultado);
        this.opcoesFuncaoEvento = [
          { id: 0, descricao: 'Selecione' },
          ...funcoesFormatadas,
        ];
      },
      error: () => {},
    });
  }

  public buscarParticipantesCheckin(paginacao?: PageEvent) {
    const checkinRequest: CheckinRequestDto = {
      idEvento: Number.parseInt(this.formCheckin.get('evento')?.value),
      nome: this.formCheckin.get('nome')?.value,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    if (Number.parseInt(this.formCheckin.get('status')?.value) == 1) {
      checkinRequest.validado = true;
    } else if (Number.parseInt(this.formCheckin.get('status')?.value) == 2) {
      checkinRequest.validado = false;
    }

    if (
      this.formCheckin.get('funcaoEvento')?.value &&
      Number.parseInt(this.formCheckin.get('funcaoEvento')?.value) != 0
    ) {
      checkinRequest.funcaoEvento = [
        Number.parseInt(this.formCheckin.get('funcaoEvento')?.value),
      ];
    } else {
      checkinRequest.funcaoEvento = null;
    }

    if (Number.parseInt(this.formCheckin.get('periodo')?.value) == 1) {
      checkinRequest.periodo = PeriodoEnum.Tarde;
    } else if (Number.parseInt(this.formCheckin.get('periodo')?.value) == 2) {
      checkinRequest.periodo = PeriodoEnum.Integral;
    } else {
      checkinRequest.periodo = null;
    }

    this.buscarParticipantesCheckinUsecase.execute(checkinRequest).subscribe({
      next: (resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.checkin = resultado;
      },
      error: (error) => {
        this.exibicaoListaParticipantes = false;
      },
    });
    return paginacao;
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
