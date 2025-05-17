import { RouterModule, Routes } from '@angular/router';
import { Rotas } from './core/domain/enums/rotas.enum';
import { CadastroComponent } from './presentation/pages/cadastro/cadastro.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: Rotas.LOGIN,
        component: LoginComponent
    },
    {
        path: Rotas.CADASTRO,
        component: CadastroComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
