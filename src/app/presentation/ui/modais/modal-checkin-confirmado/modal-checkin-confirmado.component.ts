import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DadoParticipanteDto } from '../../../../core/application/dto/response/validacao-checkin-response.dto';
import { CoresHexMap } from '../../../../core/domain/enums/cores-visita.enum';

@Component({
  selector: 'app-modal-checkin-confirmado',
  standalone: false,
  templateUrl: './modal-checkin-confirmado.component.html',
  styleUrl: './modal-checkin-confirmado.component.scss',
})
export class ModalCheckinConfirmadoComponent {
  
  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { resultadoValidacao: DadoParticipanteDto[], remocaoCheckin: boolean }
  ) {}

  buscarCorHexa(cor: string): string {
    return CoresHexMap[cor];
  }

  fecharModal() {
    this.dialog.closeAll();
  }
}
