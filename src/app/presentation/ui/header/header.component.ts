import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Rotas } from '../../../core/domain/enums/rotas.enum';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { DadosUsuarioAdminResponseDto } from '../../../core/application/dto/response/usuario-admin.dto';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  options: AnimationOptions = {
    path: '/animations/animation-perfil.json',
    renderer: 'svg',
    loop: false,
  };
  usuarioLogado: DadosUsuarioAdminResponseDto;
  isSidebarOpen = false;

  @Output() toggleMenu = new EventEmitter<void>();

  ngOnInit() {
    this.usuarioLogado = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO)
    );
  }

  openSidebar() {
    this.toggleMenu.emit();
  }

  logout() {
    this.router.navigate([Rotas.ESCOLHA_INICIAL]);
    localStorage.clear();
  }

  constructor(private readonly router: Router) {}

  navegar() {
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.CHECK_IN]);
  }
}
