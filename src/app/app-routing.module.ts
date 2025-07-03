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
import { FormDadosAdicionaisComponent } from './presentation/pages/cadastro/form-dados-adicionais/form-dados-adicionais.component';
import { FormDadosEventoComponent } from './presentation/pages/cadastro/form-dados-evento/form-dados-evento.component';
import { ConfirmacaoComponent } from './presentation/pages/cadastro/confirmacao/confirmacao.component';
import { SucessoComponent } from './presentation/pages/cadastro/sucesso/sucesso.component';
import { PerfilComponent } from './presentation/pages/perfil/perfil.component';
import { EscolhaInicialComponent } from './presentation/pages/escolha-inicial/escolha-inicial.component';
import { HomeLogadaComponent } from './presentation/pages/home-logada/home-logada.component';
import { DashboardInicialComponent } from './presentation/pages/home-logada/dashboard-inicial/dashboard-inicial.component';
import { CheckInComponent } from './presentation/pages/home-logada/check-in/check-in.component';
import { AuthGuard } from './guards/auth.guard';
import { GestaoInscricaoComponent } from './presentation/pages/home-logada/inscricao/gestao-inscricao.component';
import { ObterTodasComponent } from './presentation/pages/home-logada/inscricao/obter-todas/obter-todas.component';
import { PendentesAprovacaoComponent } from './presentation/pages/home-logada/inscricao/pendentes-aprovacao/pendentes-aprovacao.component';

export const routes: Routes = [
  {
    path: Rotas.ESCOLHA_INICIAL,
    component: EscolhaInicialComponent,
  },
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
        component: FormInicialComponent,
        //redirectTo: Rotas.FORM_DADOS_PESSOAIS,
      },
      {
        path: Rotas.FORM_DADOS_PESSOAIS,
        component: FormDadosPessoaisComponent,
      },
      {
        path: Rotas.FORM_DADOS_IGREJA,
        component: FormDadosIgrejaComponent,
      },
      {
        path: Rotas.FORM_DADOS_EVENTO,
        component: FormDadosEventoComponent,
      },
      {
        path: Rotas.FORM_DADOS_ADICIONAIS,
        component: FormDadosAdicionaisComponent,
      },
      {
        path: Rotas.CONFIRMACAO_DADOS_CADASTRO,
        component: ConfirmacaoComponent,
      },
      {
        path: Rotas.SUCESSO_CADASTRO,
        component: SucessoComponent,
      },
    ],
  },
  {
    path: Rotas.PERFIL,
    component: PerfilComponent,
  },
  {
    path: Rotas.HOME_LOGADA,
    component: HomeLogadaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: Rotas.DASHBOARD_INICIAL,
        component: DashboardInicialComponent,
      },
      {
        path: Rotas.CHECK_IN,
        component: CheckInComponent,
      },
      {
        path: Rotas.GESTAO_INSCRICAO,
        component: GestaoInscricaoComponent,
        children: [
          {
            path: Rotas.OBTER_TODAS,
            component: ObterTodasComponent,
          },
          {
            path: Rotas.PENDENTES_APROVACAO,
            component: PendentesAprovacaoComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
