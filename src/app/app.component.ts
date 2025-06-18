import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from './core/domain/enums/rotas.enum';
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'esfsg-frontend';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    // Redireciona para a página de login ao iniciar a aplicação
    //this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
  }
}
