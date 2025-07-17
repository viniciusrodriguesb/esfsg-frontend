import { HttpClient, HttpParams} from '@angular/common/http';
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

  buscarVisita(descricao?: string): Observable<VisitaResponseDto[] | null> {
    let params = new HttpParams();
    if (descricao) {
      params = params.set('descricao', descricao);
    }
    return this.http
      .get<VisitaResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}
