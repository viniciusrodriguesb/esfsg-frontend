import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { GestaoInscricaoPort } from '../../../core/domain/ports/gestao-inscricao/gestao-inscricao.port';
import {
  FiltroInscricaoRequest,
  InscricoesPendentesRequestDto,
} from '../../../core/application/dto/request/inscricoes-pendentes-request.dto';
import {
  InscricaoParaLiberacaoResponse,
  GestaoInscricaoResponse,
} from '../../../core/application/dto/response/inscricoes-response-dto';
import { PaginacaoResponse } from '../../../core/application/dto/response/paginacao-response.dto';

@Injectable({ providedIn: 'root' })
export class GestaoInscricaoAdapter extends GestaoInscricaoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarInscricaoPendente(
    request: InscricoesPendentesRequestDto
  ): Observable<PaginacaoResponse<InscricaoParaLiberacaoResponse>> {
    let params = new HttpParams();

    if (request.pagina) {
      params = params.set('pagina', request.pagina.toString());
    }
    if (request.tamanhoPagina) {
      params = params.set('tamanhoPagina', request.tamanhoPagina.toString());
    }

    if (request.idEvento !== undefined) {
      params = params.set('idEvento', request.idEvento.toString());
    }

    params = params.set('cpfLogado', request.cpfLogado);

    return this.http
      .get<PaginacaoResponse<InscricaoParaLiberacaoResponse>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoInscricao}/${ENVIRONMENT.VERSAO}/Pendentes`,
        { params }
      )
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }

  buscarInscricao(
    filtro: FiltroInscricaoRequest
  ): Observable<PaginacaoResponse<GestaoInscricaoResponse>> {
    let params = new HttpParams();

    if (filtro.regiao !== undefined) {
      params = params.set('regiao', filtro.regiao.toString());
    }

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.igreja !== undefined) {
      params = params.set('igreja', filtro.igreja.toString());
    }

    if (filtro.classe !== undefined) {
      params = params.set('classe', filtro.classe.toString());
    }

    if (filtro.funcaoEvento !== undefined) {
      params = params.set('funcaoEvento', filtro.funcaoEvento.toString());
    }

    if (filtro.periodo) {
      params = params.set('periodo', filtro.periodo);
    }

    if(filtro.idEvento !== undefined) {
      params = params.set('idEvento', filtro.idEvento.toString());
    }

    params = params.set('pagina', filtro.pagina.toString());
    params = params.set('tamanhoPagina', filtro.tamanhoPagina.toString());

    return this.http
      .get<PaginacaoResponse<GestaoInscricaoResponse>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoInscricao}/${ENVIRONMENT.VERSAO}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }

  aprovarInscricao(ids: number[]): Observable<void> {
    try {
      return this.http.post<null>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoInscricao}/${ENVIRONMENT.VERSAO}/aprovar`,
        JSON.stringify(ids),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      
      return of(null);
    }
  }
}
