import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ItemCheckinDto } from '../../../../core/application/dto/response/checkin-response-response.dto';

@Component({
  selector: 'app-modal-participante-horario-errado',
  standalone: false,
  templateUrl: './modal-participante-horario-errado.component.html',
  styleUrl: './modal-participante-horario-errado.component.scss',
})
export class ModalParticipanteHorarioErradoComponent {
  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { resultadoValidacao: ItemCheckinDto[], horarioMinimo: string}
  ) {}

  fecharModal() {
    this.dialog.closeAll();
  }
}
