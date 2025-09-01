import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarPastorPort } from '../../../core/domain/ports/pastor/editar-pastor.port';

@Injectable({ providedIn: 'root' })
export class EditarPastorAdapter extends EditarPastorPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  editarPastor(id: number, descricao: string): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    return this.http
      .put<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Pastor}/${ENVIRONMENT.VERSAO}`,
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
