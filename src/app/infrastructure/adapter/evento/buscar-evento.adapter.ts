import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EventoResponseDto } from '../../../core/application/dto/response/evento-response.dto';
import { BuscarEventoPort } from '../../../core/domain/ports/evento/buscar-evento.port';

@Injectable({ providedIn: 'root' })
export class BuscarEventoAdapter extends BuscarEventoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarEvento(idRegiao: number): Observable<EventoResponseDto[] | null> {
    const listaFixa: EventoResponseDto[] = [
      {
        id: 1,
        nome: 'Evangelho Sem Fronteiras - Teste',
        limiteIntegral: 100,
        limiteParcial: 200,
        linkGrupoWpp:
          'https://docs.google.com/forms/d/e/1FAIpQLSet3lKvs-qv0JXYIQ4tBHY6xjnXH3qxu3kmoNQUc_lctPgb9Q/viewform',
        valorIntegral: 20,
        valorParcial: 10,
        dataEvento: '01/08/2025',
        igrejaVigilia: 'MUTUÁ',
        igrejaEvento: 'MUTUÁ',
      },
    ];

    let params = new HttpParams();
    params = params.append('RegiaoId', idRegiao.toString());
    return this.http
      .get<EventoResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Evento}/${ENVIRONMENT.VERSAO}`,
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
