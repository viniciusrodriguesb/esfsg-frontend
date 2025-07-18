import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ConfirmarPagamentoPort } from '../../../core/domain/ports/gestao-pagamento/confirmar-pagamento-manualmente.port';

@Injectable({ providedIn: 'root' })
export class ConfirmarPagamentoAdapter extends ConfirmarPagamentoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  confirmarPagamentoManualmente(idInscricao: number[]): Observable<void> {    
    try {
      return this.http.put<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoPagamento}/${ENVIRONMENT.VERSAO}/confirmacao-manual`, idInscricao
      );
    } catch (error) {
      
      return of(null);
    }
  }
}
