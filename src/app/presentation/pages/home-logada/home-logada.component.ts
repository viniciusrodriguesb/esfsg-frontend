import { Component } from '@angular/core';
import { UsuarioAdminResponseDto } from '../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { Router } from '@angular/router';
import { Rotas } from '../../../core/domain/enums/rotas.enum';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, Result } from '@zxing/library';

@Component({
  selector: 'app-home-logada',
  standalone: false,
  templateUrl: './home-logada.component.html',
  styleUrl: './home-logada.component.scss'
})
export class HomeLogadaComponent {

  usuarioLogado: UsuarioAdminResponseDto;
  
  constructor(private readonly router: Router) {}

  
  isSidebarOpen = false;
  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  ngOnInit(){
    this.usuarioLogado = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO))
    
    BrowserMultiFormatReader.listVideoInputDevices().then(devices => {
      this.availableDevices = devices;
      this.selectedDevice = devices.find(d => /back|traseira/i.test(d.label)) || devices[0];
    });
    
    // if(this.usuarioLogado === null || this.usuarioLogado === undefined) {
    //   console.error('Usuário não encontrado no armazenamento local.');
    //   this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
    // }
  }

   toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navegar() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.CHECK_IN]);
    this.toggleSidebar();
  }

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  handleQrCodeResult(result: string): void {
    console.log('QR Code:', result);
    // Aqui você pode tratar o valor lido
  }

  onDeviceSelect(event: Event): void {
    const deviceId = (event.target as HTMLSelectElement).value;
    this.selectedDevice = this.availableDevices.find(d => d.deviceId === deviceId);
  }
}
