import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

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

  constructor(private readonly router: Router) {}

  navegar(){
    this.router.navigate([Rotas.HOME_LOGADA, Rotas.CHECK_IN])
  }
}
