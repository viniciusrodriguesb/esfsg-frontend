import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Rotas } from '../core/domain/enums/rotas.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
      return true;
    } else {
      this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
      return false;
    }
  }
}
