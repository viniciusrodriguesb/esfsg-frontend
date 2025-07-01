import { Component } from '@angular/core';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import { ValidarQrCodeParticipanteUseCase } from '../../../../core/application/use-cases/checkin/validar-qrcode-participante.usecase';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCheckinConfirmadoComponent } from '../modal-checkin-confirmado/modal-checkin-confirmado.component';
@Component({
  selector: 'app-modal-qrcode-checkin',
  standalone: false,
  templateUrl: './modal-qrcode-checkin.component.html',
  styleUrl: './modal-qrcode-checkin.component.scss',
})
export class ModalQrcodeCheckinComponent {
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  constructor(
    private readonly validarQrCodeParticipanteUseCase: ValidarQrCodeParticipanteUseCase,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<ModalQrcodeCheckinComponent>
  ) {}

  validarCheckin() {
    BrowserMultiFormatReader.listVideoInputDevices().then((devices) => {
      this.availableDevices = devices;
      this.selectedDevice =
        devices.find((d) => /back|traseira/i.test(d.label)) || devices[0];
    });
  }

  handleQrCodeResult(result: string): void {
    this.validarQrCodeParticipante(result);
  }

  private validarQrCodeParticipante(qrCode: string) {
    const request = {
      ids: [parseInt(qrCode)],
      presenca: true,
    };

    this.validarQrCodeParticipanteUseCase.execute(request).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.abrirModalConfirmacaoSucesso();
          this.fecharModal();
        }
      },
      error: (error) => {
        // Handle error response
        console.error('Erro ao validar QR Code:', error);
      },
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }

  abrirModalConfirmacaoSucesso() {
    const dialogRef = this.dialog.open(ModalCheckinConfirmadoComponent, {
      width: '90%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('QR Code lido:', result);
        // Faça algo com o resultado
        alert(`QR Code lido: $ {result}`);
      }
    });
  }
}
