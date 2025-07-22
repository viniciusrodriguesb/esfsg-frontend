import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';
import { AlterarSenhaUsuarioRequest } from '../../../core/application/dto/request/alterar-senha-usuario-request.dto';
import { AlterarSenhaUsuarioPort } from '../../../core/domain/ports/gestao-usuario/alterar-senha-usuario.port';

@Injectable({ providedIn: 'root' })
export class AlterarSenhaUsuarioAdapter extends AlterarSenhaUsuarioPort {  
  constructor(private readonly http: HttpClient) {
    super();
  }

  alterarSenha(request: AlterarSenhaUsuarioRequest): Observable<ResponsePadraoDto<null>> {
     return this.http.put<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoUsuario}/${ENVIRONMENT.VERSAO}/administrativo/senha`, request);    
  }
 
}