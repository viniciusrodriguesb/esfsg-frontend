import { HttpClient } from '@angular/common/http';
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
    return this.http.delete<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}/criar/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao deletar visita:', error);
          return of(null);
        })
      );
  }
}
