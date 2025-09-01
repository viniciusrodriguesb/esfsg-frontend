import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { InserirRegiaoPort } from '../../../core/domain/ports/regiao/inserir-regiao.port';

@Injectable({ providedIn: 'root' })
export class InserirRegiaoAdapter extends InserirRegiaoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirRegiao(descricao: string): Observable<null> {
    return this.http
      .post<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Regiao}/${ENVIRONMENT.VERSAO}`,
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
