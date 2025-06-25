import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidarUsuarioUseCase } from '../../../../core/application/use-cases/usuario/validar-usuario.usecase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { UsuarioResponseDto } from '../../../../core/application/dto/response/usuario-response.dto';
import { ResumoInscricaoDto } from '../../../../core/application/dto/resumo-inscricao.dto';

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
  usuarioExistente: UsuarioResponseDto;
  resumoInscricao: ResumoInscricaoDto = new ResumoInscricaoDto();

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
            confirmButtonText: 'Avançar',
            customClass: {
              title: 'swal-title',
              confirmButton: 'swal-confirm-btn',
              popup: 'swal-popup',
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.usuarioExistente = resultado;
              localStorage.setItem(
                ParametroStorageEnum.USUARIO_EXISTENTE,
                JSON.stringify(this.usuarioExistente)
              );
              this.router.navigate([Rotas.CADASTRO, Rotas.FORM_INICIAL]);
            }
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
              this.router.navigate([Rotas.CADASTRO, Rotas.FORM_INICIAL]);
            }
          });
        }
      },
      error: (error) => {
        if (error.status === 404) {
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
              this.inscricaoUsuario.cpf = this.formLogin.value.cpf;
              this.inscricaoUsuario.usuario.cpf = this.formLogin.value.cpf;

              this.resumoInscricao.usuario.cpf = this.formLogin.value.cpf;

              localStorage.setItem(
                ParametroStorageEnum.FORM_INSCRICAO,
                JSON.stringify(this.inscricaoUsuario)
              );
              localStorage.setItem(
                ParametroStorageEnum.RESUMO_INSCRICAO,
                JSON.stringify(this.resumoInscricao)
              );
              this.router.navigate([Rotas.CADASTRO, Rotas.FORM_INICIAL]);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao verificar CPF',
            text: 'Ocorreu um problema ao consultar seus dados. Por favor, tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 4000,
            customClass: {
              title: 'swal-title',
              popup: 'swal-popup',
            },
          });
        }
      },
    });
  }
}
