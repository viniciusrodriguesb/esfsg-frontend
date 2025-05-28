import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidarUsuarioUseCase } from '../../../../core/application/use-cases/usuario/validar-usuario.usecase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-form-usuario',
  standalone: false,
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss',
})
export class FormUsuarioComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formLogin = this._formBuilder.group({
    cpf: ['', Validators.required],
  });

  formSubmetido = false;

  constructor(private readonly validarUsuarioUseCase: ValidarUsuarioUseCase, private readonly router: Router) {}

  onSubmit() {
    this.formSubmetido = true;
    if (this.formLogin.valid) {
      console.log('Formulário válido', this.formLogin.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  realizarLogin() {
    this.formSubmetido = true;

    this.validarUsuarioUseCase.execute(this.formLogin.value.cpf).subscribe({
      next: (usuario) => {
        if (usuario) {
          Swal.fire({
            icon: 'success',
            title: 'Usuário validado com sucesso!',
            text: `Bem-vindo, ${usuario || 'usuário'}!`,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Opa!',
            text: 'Não encontramos esse cpf, iremos te encaminhar para o cadastro.',
            confirmButtonText: 'Ir para cadastro',
          }).then((result) => {
          if (result.isConfirmed) {
          this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
          }
        });
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Opa!',
          text: 'Não encontramos esse cpf, iremos te encaminhar para o cadastro.',
          confirmButtonText: 'Ir para cadastro',
        }).then((result) => {
          if (result.isConfirmed) {
          this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
          }
        });
      },
    });
  }
}
