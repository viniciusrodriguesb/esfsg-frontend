import { Component } from '@angular/core';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import { ValidarQrCodeParticipanteUseCase } from '../../../../core/application/use-cases/checkin/validar-qrcode-participante.usecase';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCheckinConfirmadoComponent } from '../modal-checkin-confirmado/modal-checkin-confirmado.component';
import { DadoParticipanteDto } from '../../../../core/application/dto/response/validacao-checkin-response.dto';
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
          this.abrirModalConfirmacaoSucesso(response.dados);
          this.fecharModal();
        }
      },
      error: (error) => {
      },
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }

  abrirModalConfirmacaoSucesso(resultadoValidacao: DadoParticipanteDto[]) {
    const dialogRef = this.dialog.open(ModalCheckinConfirmadoComponent, {
      width: '90%',
      height: 'auto',
      data: { resultadoValidacao: resultadoValidacao, remocaoCheckin: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }
}
