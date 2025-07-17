import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ExportarRelatorioPort } from '../../../core/domain/ports/relatorios/exportar-relatorios.port';
import { ExportarRelatorioRequestDto } from '../../../core/application/dto/request/exportar-relatorio-request.dto';

@Injectable({ providedIn: 'root' })
export class ExportarRelatorioAdapter extends ExportarRelatorioPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  exportarRelatorio(request: ExportarRelatorioRequestDto): Observable<Blob | null> {
    let params = new HttpParams()
      .set('tipoRelatorio', request.tipo.toString())
      .set('idEvento', request.idEvento.toString());

    return this.http.get(
      `${ENVIRONMENT.URL_API}/${ControllersEnum.Relatorio}/${ENVIRONMENT.VERSAO}/inscricoes`,
      { params, responseType: 'blob' }
    ).pipe(
      catchError((error) => {
        
        return of(null);
      })
    );
  }
}
