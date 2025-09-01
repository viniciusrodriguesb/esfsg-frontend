import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { InserirIgrejaPort } from '../../../core/domain/ports/igreja/inserir-igreja.port';

@Injectable({ providedIn: 'root' })
export class InserirIgrejaAdapter extends InserirIgrejaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirIgreja(descricao: string): Observable<null> {
    return this.http
      .post<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Igreja}/${ENVIRONMENT.VERSAO}`,
        JSON.stringify(descricao),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}
