import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarProximoEventoPort } from '../../../core/domain/ports/dashboard/buscar-proximo-evento.port';
import { ProximoEventoResponseDto } from '../../../core/application/dto/response/proximo-evento-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarProximoEventoAdapter extends BuscarProximoEventoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarProximoEvento(idRegiao: number): Observable<ProximoEventoResponseDto | null> {
    const listaFixa: ProximoEventoResponseDto = {
      id: 1,
      nome: 'Evangelho Sem Fronteiras - Teste',
      igreja: 'MUTUÁ',
      data: '01/08/2025',
    };

    let params = new HttpParams();
    params = params.append('IdRegiao', idRegiao.toString());
    return this.http
      .get<ProximoEventoResponseDto>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Dashboard}/${ENVIRONMENT.VERSAO}/evento-proximo`,
        { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar eventos:', error);
          return of(listaFixa);
        })
      );
  }
}
