import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-sucesso',
  standalone: false,
  templateUrl: './sucesso.component.html',
  styleUrl: './sucesso.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SucessoComponent {
 options: AnimationOptions = {
    path: '/animations/animation-complete-alt3.json',
    renderer: 'svg',
    loop: false,
  };

  constructor(
    private readonly router: Router
  ) {}

  animationCreated(animationItem: AnimationItem): void {
  }
  navegarParaPerfil(){
    this.router.navigate([Rotas.PERFIL]);
  }
}
