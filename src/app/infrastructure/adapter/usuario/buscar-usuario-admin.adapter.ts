import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';
import { BuscarUsuarioAdminPort } from '../../../core/domain/ports/usuario/buscar-usuario-admin.port';
import { UsuarioAdminResponseDto } from '../../../core/application/dto/response/usuario-admin.dto';

@Injectable({ providedIn: 'root' })
export class BuscarUsuarioAdminAdapter extends BuscarUsuarioAdminPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarUsuarioAdmin(cpf: string, senha: string): Observable<UsuarioAdminResponseDto | null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Cpf, cpf);
    params = params.append(ParametrosHttpEnum.Senha, senha);

    try {
      return this.http.get<UsuarioAdminResponseDto>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Usuario}/${ENVIRONMENT.VERSAO}/administrativo`, { params }
      );
    } catch (error) {
      
      return of(null);
    }
  }
}
