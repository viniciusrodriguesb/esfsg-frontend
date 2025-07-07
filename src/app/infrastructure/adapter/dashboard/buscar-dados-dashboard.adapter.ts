import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarDadosDashboardPort } from '../../../core/domain/ports/dashboard/buscar-dados-dashboard.port';
import { DadosDashboardResponseDto } from '../../../core/application/dto/response/dados-dashboard-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarDadosDashboardAdapter extends BuscarDadosDashboardPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarDadosDashboard(idEvento: number): Observable<DadosDashboardResponseDto | null> {
    let params = new HttpParams();
    params = params.append('idEvento', idEvento.toString());
    return this.http
      .get<DadosDashboardResponseDto>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Dashboard}/${ENVIRONMENT.VERSAO}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar eventos:', error);
          return of(null);
        })
      );
  }
}
