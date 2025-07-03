import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-gestao-inscricao',
  standalone: false,
  templateUrl: './gestao-inscricao.component.html',
  styleUrl: './gestao-inscricao.component.scss',
})
export class GestaoInscricaoComponent {
  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  activeTab: 'pendentes' | 'todas' = 'pendentes';

  constructor(private router: Router) {}

  irPara(destino: 'pendentes' | 'todas') {
    this.activeTab = destino;

    if (destino === 'pendentes') {
       this.router.navigate([Rotas.HOME_LOGADA, Rotas.GESTAO_INSCRICAO, Rotas.PENDENTES_APROVACAO]);
    } else {
     this.router.navigate([Rotas.HOME_LOGADA, Rotas.GESTAO_INSCRICAO, Rotas.OBTER_TODAS]);
    }
  }
}
