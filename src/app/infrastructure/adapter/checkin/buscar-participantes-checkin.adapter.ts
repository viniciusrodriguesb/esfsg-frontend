import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { BuscarParticipantesCheckinPort } from '../../../core/domain/ports/checkin/buscar-participantes-checkin.port';
import { CheckinRequestDto } from '../../../core/application/dto/request/checkin-request.dto';
import { CheckinResponseDto } from '../../../core/application/dto/response/checkin-response-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarParticipantesCheckinAdapter extends BuscarParticipantesCheckinPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarParticipantesCheckin(checkinRequest: CheckinRequestDto): Observable<CheckinResponseDto | null> {
    
    let params = new HttpParams();

    if(checkinRequest.idEvento) {
      params = params.set('idEvento', checkinRequest.idEvento.toString());
    }
    if (checkinRequest.pagina) {
      params = params.set('pagina', checkinRequest.pagina.toString());
    }
    if (checkinRequest.tamanhoPagina) {
      params = params.set('tamanhoPagina', checkinRequest.tamanhoPagina.toString());
    }
    if (checkinRequest.nome) {
      params = params.set('nome', checkinRequest.nome.toString());
    }
    if (checkinRequest.validado != null) {
      params = params.set('validado', checkinRequest.validado.toString());
    }
    if (checkinRequest.periodo) {
      params = params.set('periodo', checkinRequest.periodo.toString());
    }
    if (checkinRequest.funcaoEvento && checkinRequest.funcaoEvento.length > 0) {
      params = params.set('funcaoEvento', checkinRequest.funcaoEvento.join(','));
    }

    return this.http.get<CheckinResponseDto>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Checkin}/${ENVIRONMENT.VERSAO}`, { params }).pipe(
      catchError((error) => {
        
        return of(null);
      })
    );
  }
}
