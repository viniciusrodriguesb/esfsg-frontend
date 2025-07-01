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
    const listaFixa: DadosDashboardResponseDto = {
      inscritos: {
        confirmados: { idStatus: 1, quantidade: 100, percentual: 50 },
        aguardandoLiberacao: { idStatus: 2, quantidade: 50, percentual: 25 },
        pendentes: { idStatus: 3, quantidade: 30, percentual: 15 },
        cancelados: { idStatus: 4, quantidade: 20, percentual: 10 },
        reembolsoSolicitado: { idStatus: 5, quantidade: 10, percentual: 5 },
      },
      inscritosPeriodo: {
        quantidadeInscritosIntegral: 80,
        quantidadeInscritosTarde: 20,
      },
      inscritosVisita: {
        inscritosDisponiveisVisita: 50,
        inscritosAlocados: 30,
        totalVisitas: 10,
      },
      arrecadacao: {
        total: 'R$ 100,00',
        valorArrecadadoIntegral: 'R$ 80,00',
        valorArrecadadoParcial: 'R$ 20,00',
      },
    };
    

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
          return of(listaFixa);
        })
      );
  }
}
