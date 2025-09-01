import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { DeletarPastorPort } from '../../../core/domain/ports/pastor/deletar-pastor.port';

@Injectable({ providedIn: 'root' })
export class DeletarPastorAdapter extends DeletarPastorPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  deletarPastor(id: number): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    return this.http
      .delete<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Pastor}/${ENVIRONMENT.VERSAO}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}
