import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { DeletarVisitaPort } from '../../../core/domain/ports/visita/deletar-visita.port';

@Injectable({ providedIn: 'root' })
export class DeletarVisitaAdapter extends DeletarVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  deletarVisita(id: number): Observable<null> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.delete<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}`, { params })
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}
