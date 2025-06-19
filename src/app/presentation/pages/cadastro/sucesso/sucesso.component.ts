import { Component, ViewEncapsulation } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
