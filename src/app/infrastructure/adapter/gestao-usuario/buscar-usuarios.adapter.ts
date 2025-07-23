import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarUsuariosPort } from '../../../core/domain/ports/gestao-usuario/buscar-usuarios.port';
import { BuscarUsuariosRequest } from '../../../core/application/dto/request/buscar-usuarios-request.dto';
import { BuscarUsuarioResponseDto } from '../../../core/application/dto/response/buscar-usuarios-response.dto';
import { PaginacaoResponse } from '../../../core/application/dto/response/paginacao-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarUsuarioAdapter extends BuscarUsuariosPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarUsuarios(
    request: BuscarUsuariosRequest
  ): Observable<PaginacaoResponse<BuscarUsuarioResponseDto>> {
    let params = new HttpParams();

    if (request.nome) {
      params = params.set('nome', request.nome);
    }

    if (request.idIgreja != undefined && request.idIgreja != null) {
      params = params.set('idIgreja', request.idIgreja.toString());
    }

    if (request.idClasse != undefined && request.idClasse != null) {
      params = params.set('idClasse', request.idClasse.toString());
    }

    if (request.cpf) {
      params = params.set('cpf', request.cpf);
    }

    if (request.tipoUsuario != undefined && request.tipoUsuario != null) {
      params = params.set('tipoUsuario', request.tipoUsuario.toString());
    }

    params = params.set('pagina', request.pagina.toString());
    params = params.set('tamanhoPagina', request.tamanhoPagina.toString());

    return this.http.get<PaginacaoResponse<BuscarUsuarioResponseDto>>(
      `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoUsuario}/${ENVIRONMENT.VERSAO}`,
      { params }
    );
  }
}
