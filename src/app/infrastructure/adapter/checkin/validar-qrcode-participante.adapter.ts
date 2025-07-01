import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ValidarQrCodeParticipantePort } from '../../../core/domain/ports/checkin/validar-qrcode-participante.port';
import { ValidacaoQrCodeParticipanteRequestDto } from '../../../core/application/dto/request/validacao-checkin-request.dto';
import { ValidacaoQrCodeParticipanteResponseDto } from '../../../core/application/dto/response/validacao-checkin-response.dto';

@Injectable({ providedIn: 'root' })
export class ValidarQrCodeParticipanteAdapter extends ValidarQrCodeParticipantePort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  validarQrCodeParticipante(request: ValidacaoQrCodeParticipanteRequestDto): Observable<ValidacaoQrCodeParticipanteResponseDto | null> {

    return this.http.post<ValidacaoQrCodeParticipanteResponseDto>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Checkin}/${ENVIRONMENT.VERSAO}`, request).pipe(
      catchError((error) => {
        console.error('Erro ao validar QR Code do participante:', error);
        return of(null);
      })
    );
  }
}