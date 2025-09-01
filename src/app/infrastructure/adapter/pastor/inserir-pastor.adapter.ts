import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { InserirPastorPort } from '../../../core/domain/ports/pastor/inserir-pastor.port';

@Injectable({ providedIn: 'root' })
export class InserirPastorAdapter extends InserirPastorPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirPastor(descricao: string): Observable<null> {
    return this.http
      .post<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Pastor}/${ENVIRONMENT.VERSAO}`,
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
