import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosUsuarioAdminResponseDto } from '../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  usuarioLogado: DadosUsuarioAdminResponseDto;
  isSidebarOpen = false;
  rotas = Rotas

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.usuarioLogado = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO)
    );
  }

  toggleSidebar() {

    
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navegar(rota: Rotas) {
    if (rota === Rotas.LOGIN) {
      this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
      localStorage.clear();
    } else {
      this.router.navigate([Rotas.HOME_LOGADA, rota]);
      this.toggleSidebar();
    }
  }
}

