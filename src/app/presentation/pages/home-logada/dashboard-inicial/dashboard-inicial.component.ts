import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard-inicial',
  standalone: false,
  templateUrl: './dashboard-inicial.component.html',
  styleUrl: './dashboard-inicial.component.scss'
})
export class DashboardInicialComponent {
   options: AnimationOptions = {
    path: '/animations/animation-perfil.json',
    renderer: 'svg',
    loop: false,
  };
}
