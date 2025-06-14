import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidarUsuarioUseCase } from '../../../../core/application/use-cases/usuario/validar-usuario.usecase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';

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
  inscricaoUsuario: InscricaoRequestDto = new InscricaoRequestDto();

  constructor(
    private readonly validarUsuarioUseCase: ValidarUsuarioUseCase,
    private readonly router: Router
  ) {}

  public realizarLogin() {
    this.formSubmetido = true;

    this.validarUsuarioUseCase.execute(this.formLogin.value.cpf).subscribe({
      next: (resultado) => {
        if (resultado) {
          Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: `Tudo certo com seu acesso, ${
              resultado.nomeCompleto || 'usuário'
            }!`,
            customClass: {
              title: 'swal-title',
              confirmButton: 'swal-confirm-btn',
              popup: 'swal-popup',
            },
            buttonsStyling: false,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Opa!',
            text: 'Não encontramos esse cpf, iremos te encaminhar para o cadastro.',
            confirmButtonText: 'Ir para cadastro',
            customClass: {
              title: 'swal-title',
              confirmButton: 'swal-confirm-btn',
              popup: 'swal-popup',
            },
            buttonsStyling: false,
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
          text: 'Não encontramos esse CPF, iremos te encaminhar para o cadastro.',
          confirmButtonText: 'Ir para cadastro',
          customClass: {
            title: 'swal-title',
            confirmButton: 'swal-confirm-btn',
            popup: 'swal-popup',
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(this.formLogin.value.cpf);
            
            this.inscricaoUsuario.cpf = this.formLogin.value.cpf;
            this.inscricaoUsuario.usuario.cpf = this.formLogin.value.cpf;
            localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario))
            this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
          }
        });
      },
    });
  }
}
