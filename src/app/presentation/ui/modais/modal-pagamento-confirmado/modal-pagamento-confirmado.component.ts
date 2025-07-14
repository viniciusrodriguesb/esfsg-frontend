import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GestaoPagamentoResponseDto } from '../../../../core/application/dto/response/gestao-pagamento-response.dto';

@Component({
  selector: 'app-modal-pagamento-confirmado',
  standalone: false,
  templateUrl: './modal-pagamento-confirmado.component.html',
  styleUrl: './modal-pagamento-confirmado.component.scss'
})
export class ModalPagamentoConfirmadoComponent {
  
  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { resultadoAprovacao: GestaoPagamentoResponseDto[] }
  ) {}

  fecharModal() {
    this.dialog.closeAll();
  }
}
