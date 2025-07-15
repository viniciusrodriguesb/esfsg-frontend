import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarUsuarioPort } from '../../../core/domain/ports/usuario/editar-usuario.port';
import { EdicaoUsuarioRequestDto } from '../../../core/application/dto/request/edicao-usuario-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';

@Injectable({ providedIn: 'root' })
export class EditarUsuarioAdapter extends EditarUsuarioPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  editarUsuario(usuario: EdicaoUsuarioRequestDto): Observable<ResponsePadraoDto<null>> {
    return this.http.put<ResponsePadraoDto<null>>(
      `${ENVIRONMENT.URL_API}/${ControllersEnum.Usuario}/${ENVIRONMENT.VERSAO}`,
      usuario
    );
  }
}