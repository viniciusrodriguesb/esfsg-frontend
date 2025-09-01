import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarIgrejaPort } from '../../../core/domain/ports/igreja/editar-igreja.port';

@Injectable({ providedIn: 'root' })
export class EditarIgrejaAdapter extends EditarIgrejaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  editarIgreja(id: number, descricao: string): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    return this.http
      .put<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Igreja}/${ENVIRONMENT.VERSAO}`,
        JSON.stringify(descricao),
        { headers: { 'Content-Type': 'application/json' }, params }
      )
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}
