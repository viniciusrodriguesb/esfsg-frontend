import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-checkin-confirmado',
  standalone: false,
  templateUrl: './modal-checkin-confirmado.component.html',
  styleUrl: './modal-checkin-confirmado.component.scss',
})
export class ModalCheckinConfirmadoComponent {
  
  constructor(
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<ModalCheckinConfirmadoComponent>
  ) {}

  fecharModal() {
    this.dialog.closeAll();
  }
}
