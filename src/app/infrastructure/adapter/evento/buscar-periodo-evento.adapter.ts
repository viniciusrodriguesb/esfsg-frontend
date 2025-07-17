import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarPeriodoEventoPort } from '../../../core/domain/ports/evento/buscar-periodo-evento.port';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarPeriodoEventoAdapter extends BuscarPeriodoEventoPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarPeriodoEvento(idEvento: number): Observable<TabelaDominioResponseDto[] | null> {
    let params = new HttpParams();
    params = params.append('idEvento', idEvento.toString());
    return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Evento}/${ENVIRONMENT.VERSAO}/periodos`,{ params })
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}
