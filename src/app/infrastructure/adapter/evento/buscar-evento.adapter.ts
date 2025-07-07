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

  buscarEvento(): Observable<EventoResponseDto[] | null> {
    return this.http
      .get<EventoResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Evento}/${ENVIRONMENT.VERSAO}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar eventos:', error);
          return of(null);
        })
      );
  }
}
