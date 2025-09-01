import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ParametrosHttpEnum } from '../../../core/domain/enums/parametros-http.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarRegiaoPort } from '../../../core/domain/ports/regiao/editar-regiao.port';

@Injectable({ providedIn: 'root' })
export class EditarRegiaoAdapter extends EditarRegiaoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  editarRegiao(id: number, descricao: string): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    return this.http
      .put<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Regiao}/${ENVIRONMENT.VERSAO}`,
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
