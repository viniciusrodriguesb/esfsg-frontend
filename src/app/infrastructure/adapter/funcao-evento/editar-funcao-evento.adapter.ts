import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarFuncaoEventoPort } from '../../../core/domain/ports/funcao-evento/editar-funcao-evento.port';
import { EditarFuncaoEventoRequest } from '../../../core/application/dto/request/editar-funcao-evento-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';

@Injectable({ providedIn: 'root' })
export class EditarFuncaoEventoAdapter extends EditarFuncaoEventoPort {
  private readonly endpoint = `${ENVIRONMENT.URL_API}/${ControllersEnum.FuncaoEvento}/${ENVIRONMENT.VERSAO}`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  editarFuncaoEvento(
    request: EditarFuncaoEventoRequest
  ): Observable<ResponsePadraoDto<null> | null> {
    return this.http.put<ResponsePadraoDto<null>>(this.endpoint, request).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}
