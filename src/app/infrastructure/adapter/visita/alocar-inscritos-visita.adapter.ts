import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { AlocarInscritosVisitaPort } from '../../../core/domain/ports/visita/alocar-inscritos-visita.port';
import { AlocacaoInscritoVisitaRequestDto } from '../../../core/application/dto/request/alocacao-inscrito-visita-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';

@Injectable({ providedIn: 'root' })
export class AlocarInscritosVisitaAdapter extends AlocarInscritosVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  alocarInscritoVisita(request: AlocacaoInscritoVisitaRequestDto[]): Observable<ResponsePadraoDto<null>> {
    try {
      return this.http.post<ResponsePadraoDto<null>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}/alocar`,
        request
      );
    } catch (error) {
      
      return of(null);
    }
  }
}