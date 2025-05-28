import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ValidarUsuarioPort } from '../../../core/domain/ports/usuario/validar-usuario.port';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { UsuarioResponseDto } from '../../../core/application/dto/response/usuario-response.dto';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';

@Injectable({ providedIn: 'root' })
export class ValidarUsuarioAdapter extends ValidarUsuarioPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  validarUsuario(cpf: string): Observable<UsuarioResponseDto | null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Cpf, cpf);

    try {
      return this.http.get<UsuarioResponseDto>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Usuario}/${ENVIRONMENT.VERSAO}`, { params }
      );
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return of(null);
    }
  }
}
