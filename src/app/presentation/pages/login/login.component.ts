import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formLogin = this._formBuilder.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  exibe = false;

  formSubmetido = false;

  onSubmit() {
    this.formSubmetido = true;
    if (this.formLogin.valid) {
      console.log('Formulário válido', this.formLogin.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
