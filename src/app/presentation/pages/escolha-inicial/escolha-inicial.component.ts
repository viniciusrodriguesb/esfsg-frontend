import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-escolha-inicial',
  standalone: false,
  templateUrl: './escolha-inicial.component.html',
  styleUrl: './escolha-inicial.component.scss'
})
export class EscolhaInicialComponent {
constructor(private readonly router: Router) {}

navegar(opcao: number): void {
    if (opcao === 1) {
      this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
    } else if (opcao === 2) {
      this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
    }
  }
}
