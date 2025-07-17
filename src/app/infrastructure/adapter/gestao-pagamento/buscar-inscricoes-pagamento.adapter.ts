import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarInscricoesPagamentoPort } from '../../../core/domain/ports/gestao-pagamento/buscar-inscricoes-pagamento.port';
import { GestaoPagamentoRequestDto } from '../../../core/application/dto/request/gestao-pagamento-request.dto';
import { GestaoPagamentoResponseDto } from '../../../core/application/dto/response/gestao-pagamento-response.dto';
import { PaginacaoResponse } from '../../../core/application/dto/response/paginacao-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarInscricoesPagamentoAdapter extends BuscarInscricoesPagamentoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarInscricoesPagamento(
    filtro: GestaoPagamentoRequestDto
  ): Observable<PaginacaoResponse<GestaoPagamentoResponseDto>> {
    let params = new HttpParams();

    params = params.set('idEvento', filtro.idEvento)
    params = params.set('pagina', filtro.pagina.toString());
    params = params.set('tamanhoPagina', filtro.tamanhoPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.status) {
      params = params.set('status', filtro.status.toString());
    }

    return this.http
      .get<PaginacaoResponse<GestaoPagamentoResponseDto>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoPagamento}/${ENVIRONMENT.VERSAO}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}
