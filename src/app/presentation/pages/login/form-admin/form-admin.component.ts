import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BuscarUsuarioAdminUseCase } from '../../../../core/application/use-cases/usuario/buscar-usuario-admin.usecase';
import { DadosUsuarioAdminResponseDto, UsuarioAdminResponseDto } from '../../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-form-admin',
  standalone: false,
  templateUrl: './form-admin.component.html',
  styleUrl: './form-admin.component.scss'
})
export class FormAdminComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formLogin = this._formBuilder.group({
    cpf: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  formSubmetido = false;

  constructor(
    private readonly buscarUsuarioAdminUseCase: BuscarUsuarioAdminUseCase,
    private readonly router: Router) {}

  public buscarUsuarioAdmin() {
    const cpf = this.formLogin.get('cpf')?.value;
    const senha = this.formLogin.get('senha')?.value;

    this.buscarUsuarioAdminUseCase.execute(cpf, senha).subscribe({
      next: (usuario) => {
        if (usuario) {
          localStorage.setItem(ParametroStorageEnum.USUARIO_LOGADO, JSON.stringify(usuario.dados));
          this.router.navigate([Rotas.HOME_LOGADA])
        } else {
          console.log('Usuário não encontrado');
        }
      },
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    });
  }

  onSubmit() {
    this.formSubmetido = true;
    if (this.formLogin.valid) {
      console.log('Formulário válido', this.formLogin.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
