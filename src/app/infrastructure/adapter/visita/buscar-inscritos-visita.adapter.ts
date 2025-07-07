import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarInscritosVisitaPort } from '../../../core/domain/ports/visita/buscar-inscritos-visita.port';
import { InscritoVisitaResponseDto } from '../../../core/application/dto/response/incritos-visita-response.dto';
import { PaginacaoResponse } from '../../../core/application/dto/response/paginacao-response.dto';
import { InscritoVisitaRequestDto } from '../../../core/application/dto/request/inscrito-visita-request.dto';

@Injectable({ providedIn: 'root' })
export class BuscarInscritosVisitaAdapter extends BuscarInscritosVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarInscritosVisita(
    request: InscritoVisitaRequestDto
  ): Observable<PaginacaoResponse<InscritoVisitaResponseDto> | null> {
    let params = new HttpParams();

    params = params.set('idEvento', request.idEvento.toString());
    params = params.set('pagina', request.pagina.toString());
    params = params.set('tamanhoPagina', request.tamanhoPagina.toString());
    params = params.set('alocado', request.alocado.toString());

    return this.http
      .get<PaginacaoResponse<InscritoVisitaResponseDto>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}/inscritos-visitas`,
        { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar inscritos de visita:', error);
          return of(null);
        })
      );
  }
}
