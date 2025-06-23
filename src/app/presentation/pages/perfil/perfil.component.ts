import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {
  user = {
    nomeCompleto: 'LUCIANA DA CONCEICAO FERREIRA DE SOUSA',
    email: 'luconfe@gmail.com',
    telefone: '(21) 99187 1630',
    grupo: 'Professor(a) de CIA',
    igreja: 'JARDIM CALIFÓRNIA',
    periodo: 'Período Integral',
    statusPagamento: 'Pagamento confirmado!',
  };

  perfilCampos = [
    { label: 'Nome Completo', value: 'LUCIANA DA CONCEICAO FERREIRA DE SOUSA' },
    { label: 'E-mail', value: 'luconfe@gmail.com' },
    { label: 'Telefone', value: '(21) 99187 1630' },
    { label: 'Grupo', value: 'Professor(a) de CIA' },
    { label: 'Igreja', value: 'JARDIM CALIFÓRNIA' },
    { label: 'Período', value: 'Período Integral' },
    { label: 'Status do Pagamento', value: 'Pagamento confirmado!' },
  ];
}
