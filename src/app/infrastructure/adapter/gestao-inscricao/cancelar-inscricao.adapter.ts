import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CancelarInscricaoPort } from '../../../core/domain/ports/gestao-inscricao/cancelar-inscricao.port';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';

@Injectable({ providedIn: 'root' })
export class CancelarInscricaoAdapter extends CancelarInscricaoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }
  
  cancelarInscricoes(ids: number[]): Observable<void> {
    try {
      return this.http.post<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoInscricao}/${ENVIRONMENT.VERSAO}/cancelar`,
        JSON.stringify(ids),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      
      return of(null);
    }
  }
}
