import { Component} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/animations/confirmacao.json',
    loop: false,
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
