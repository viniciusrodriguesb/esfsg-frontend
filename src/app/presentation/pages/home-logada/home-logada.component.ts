import { Component } from '@angular/core';
import {
  DadosUsuarioAdminResponseDto,
  UsuarioAdminResponseDto,
} from '../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { Router } from '@angular/router';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-home-logada',
  standalone: false,
  templateUrl: './home-logada.component.html',
  styleUrl: './home-logada.component.scss',
})
export class HomeLogadaComponent {
  usuarioLogado: DadosUsuarioAdminResponseDto;
  isSidebarOpen = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.usuarioLogado = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO)
    );
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navegarDashboard() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.DASHBOARD_INICIAL]);
    this.toggleSidebar();
  }

  navegarCheckin() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.CHECK_IN]);
    this.toggleSidebar();
  }

  navegarPagamento() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.GESTAO_PAGAMENTO]);
    this.toggleSidebar();
  }

  navegarVisita() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.GESTAO_VISITAS]);
    this.toggleSidebar();
  }

  navegarGestaoInscricao() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.GESTAO_INSCRICAO]);
    this.toggleSidebar();
  }

  navegarRelatorios() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.RELATORIOS]);
    this.toggleSidebar();
  }

  navegarCrudVisita() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.CRUD_VISITA]);
    this.toggleSidebar();
  }

  logout() {
    this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
    localStorage.clear();
  }
}
