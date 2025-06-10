import { RouterModule, Routes } from '@angular/router';
import { Rotas } from './core/domain/enums/rotas.enum';
import { CadastroComponent } from './presentation/pages/cadastro/cadastro.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { NgModule } from '@angular/core';
import { FormDadosPessoaisComponent } from './presentation/pages/cadastro/form-dados-pessoais/form-dados-pessoais.component';
import { FormDadosIgrejaComponent } from './presentation/pages/cadastro/form-dados-igreja/form-dados-igreja.component';
import { FormUsuarioComponent } from './presentation/pages/login/form-usuario/form-usuario.component';
import { FormAdminComponent } from './presentation/pages/login/form-admin/form-admin.component';
import { FormInicialComponent } from './presentation/pages/cadastro/form-inicial/form-inicial.component';

export const routes: Routes = [
  {
    path: Rotas.LOGIN,
    component: LoginComponent,
    children: [
      {
        path: Rotas.LOGIN_USUARIO,
        component: FormUsuarioComponent,
      },
      {
        path: Rotas.LOGIN_ADMINISTRADOR,
        component: FormAdminComponent,
      },
    ],
  },
  {
    path: Rotas.CADASTRO,
    component: CadastroComponent,
    children: [
      {
        path: Rotas.FORM_INICIAL,
        component: FormInicialComponent
        //redirectTo: Rotas.FORM_DADOS_PESSOAIS,
      },
      {
        path: Rotas.FORM_DADOS_PESSOAIS,
        component: FormDadosPessoaisComponent,
      },
      {
        path: Rotas.FORM_DADOS_IGREJA,
        component: FormDadosIgrejaComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
