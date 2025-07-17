import { HttpClient } from '@angular/common/http';
import { CriarVisitaPort } from '../../../core/domain/ports/visita/criar-visita.port';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CriarVisitaRequestDto } from '../../../core/application/dto/request/criar-visita-request.dto';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { EditarVisitaPort } from '../../../core/domain/ports/visita/editar-visita.port';
import { EditarVisitaRequestDto } from '../../../core/application/dto/request/editar-visita-request.dto';

@Injectable({ providedIn: 'root' })
export class EditarVisitaAdapter extends EditarVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  editarVisita(request: EditarVisitaRequestDto): Observable<ResponsePadraoDto<EditarVisitaRequestDto>> {
    return this.http
      .put<ResponsePadraoDto<EditarVisitaRequestDto>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}`,
        request
      ).pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}