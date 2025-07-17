import { HttpClient } from '@angular/common/http';
import { CriarVisitaPort } from '../../../core/domain/ports/visita/criar-visita.port';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CriarVisitaRequestDto } from '../../../core/application/dto/request/criar-visita-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';

@Injectable({ providedIn: 'root' })
export class CriarVisitaAdapter extends CriarVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  criarVisita(request: CriarVisitaRequestDto): Observable<ResponsePadraoDto<CriarVisitaRequestDto>> {
    return this.http
      .post<ResponsePadraoDto<CriarVisitaRequestDto>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}/criar`,
        request
      ).pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}
