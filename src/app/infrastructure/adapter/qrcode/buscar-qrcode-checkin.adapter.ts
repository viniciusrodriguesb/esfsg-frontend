import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";

import { ENVIRONMENT } from "../../../environment/environment-des";
import { BuscarQrCodeCheckinPort } from "../../../core/domain/ports/qrcode/buscar-qrcode-checkin.port";
import { QrCodeCheckinResponseDto } from "../../../core/application/dto/response/qrcode-checkin-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarQrCodeCheckinAdapter extends BuscarQrCodeCheckinPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarQrCodeCheckin(idInscricao: number): Observable<QrCodeCheckinResponseDto> {
    let params = new HttpParams()
    params = params.append('idInscricao', idInscricao.toString());

    return this.http.get<QrCodeCheckinResponseDto>(`${ENVIRONMENT.URL_API}/${ControllersEnum.QrCode}/${ENVIRONMENT.VERSAO}/acesso`, { params }).pipe(
      catchError((error) => {
        
        return of(null);
      })
    );
  }
}