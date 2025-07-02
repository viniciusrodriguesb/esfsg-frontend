import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BuscarUsuarioAdminUseCase } from '../../../../core/application/use-cases/usuario/buscar-usuario-admin.usecase';
import { DadosUsuarioAdminResponseDto } from '../../../../core/application/dto/response/usuario-admin.dto';
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
  usuarioLogado: DadosUsuarioAdminResponseDto;

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
          this.redirecionarUsuario();       
        } else {
          console.log(usuario.mensagem);
        }
      },
      error: (error) => {
        this.router.navigate([Rotas.HOME_LOGADA, Rotas.DASHBOARD_INICIAL])
        console.error(error.error.mensagem);
      }
    });
  }

  private redirecionarUsuario(){
    this.usuarioLogado = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO));

    if(this.usuarioLogado == null)
      console.log('Dados do usuário não encontrados');

    const role = this.usuarioLogado.role;
    if (role <= 3) {
        this.router.navigate([Rotas.HOME_LOGADA, Rotas.DASHBOARD_INICIAL]);
      } else if (role === 5) {
        this.router.navigate([Rotas.HOME_LOGADA, Rotas.CHECK_IN]);
      } else if (role === 4) {
        //this.router.navigate([Rotas.HOME_LOGADA, Rotas.INSCRICOES]); 
      } else {
        console.warn('Role não reconhecida:', role);
      }
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
