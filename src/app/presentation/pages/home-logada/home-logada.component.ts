import { Component } from '@angular/core';
import { UsuarioAdminResponseDto } from '../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { Router } from '@angular/router';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-home-logada',
  standalone: false,
  templateUrl: './home-logada.component.html',
  styleUrl: './home-logada.component.scss'
})
export class HomeLogadaComponent {

  usuarioLogado: UsuarioAdminResponseDto;
  
  constructor(private readonly router: Router) {}

  ngOnInit(){
    this.usuarioLogado = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO))
    
   // if(this.usuarioLogado === null || this.usuarioLogado === undefined) {
      console.error('Usuário não encontrado no armazenamento local.');
      this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_ADMINISTRADOR]);
    //}
  }
}
