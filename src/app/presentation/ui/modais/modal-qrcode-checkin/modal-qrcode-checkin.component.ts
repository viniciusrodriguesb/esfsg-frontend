import { Component } from '@angular/core';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
@Component({
  selector: 'app-modal-qrcode-checkin',
  standalone: false,
  templateUrl: './modal-qrcode-checkin.component.html',
  styleUrl: './modal-qrcode-checkin.component.scss'
})
export class ModalQrcodeCheckinComponent {

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
    validarCheckin(){
    BrowserMultiFormatReader.listVideoInputDevices().then(devices => {
      this.availableDevices = devices;
      this.selectedDevice = devices.find(d => /back|traseira/i.test(d.label)) || devices[0];
    });
  }

  handleQrCodeResult(result: string): void {
    alert('QR Code lido: ' + result);
    console.log('QR Code:', result);
    // Aqui você pode tratar o valor lido
  }
}
