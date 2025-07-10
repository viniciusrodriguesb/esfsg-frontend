import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarVisitaPort } from '../../../core/domain/ports/visita/buscar-visita.port';
import { VisitaResponseDto } from '../../../core/application/dto/response/visita-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarVisitaAdapter extends BuscarVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarVisita(): Observable<VisitaResponseDto[] | null> {
    return this.http
      .get<VisitaResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}`
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar visitas:', error);
          return of(null);
        })
      );
  }
}
