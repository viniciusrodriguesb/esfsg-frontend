import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-admin',
  standalone: false,
  templateUrl: './form-admin.component.html',
  styleUrl: './form-admin.component.scss'
})
export class FormAdminComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formLogin = this._formBuilder.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

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
