import { Component, Inject, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { CheckinResponseDto } from '../../../../core/application/dto/response/checkin-response-response.dto';

@Component({
  selector: 'app-filtro-checkin',
  standalone: false,
  templateUrl: './filtro-checkin.component.html',
  styleUrl: './filtro-checkin.component.scss',
})
export class FiltroCheckinComponent {
  private readonly _bottomSheetRef = inject<MatBottomSheetRef<FiltroCheckinComponent>>(MatBottomSheetRef);
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

  formFiltroCheckin = this._formBuilder.group({
    funcaoEvento: [''],
    periodo: [''],
    status: [''],
    nome: [''],
  });

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {idEvento: number},
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
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
    this._bottomSheetRef.dismiss(this.formFiltroCheckin.value);
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(this.data.idEvento).subscribe({
      next: (resultado) => {
        const funcoesFormatadas = resultado.map((evento) => ({
          id: evento.id,
          descricao: this.nomePipe.transform(evento.descricao),
        }));

        this.opcoesFuncaoEvento = [
          { id: 0, descricao: 'Selecione' },
          ...funcoesFormatadas,
        ];
      },
      error: () => {},
    });
  }
}
