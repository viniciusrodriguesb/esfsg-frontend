import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { AlterarRoleUsuarioPort } from '../../../core/domain/ports/gestao-usuario/alterar-role-usuario.port';
import { AlterarRoleUsuarioRequest } from '../../../core/application/dto/request/alterar-role-usuario-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';

@Injectable({ providedIn: 'root' })
export class AlterarRoleUsuarioAdapter extends AlterarRoleUsuarioPort {  
  constructor(private readonly http: HttpClient) {
    super();
  }

  alterarRole(request: AlterarRoleUsuarioRequest): Observable<ResponsePadraoDto<null>> {
     return this.http.put<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoUsuario}/${ENVIRONMENT.VERSAO}/administrativo/role`, request);    
  }
 
}