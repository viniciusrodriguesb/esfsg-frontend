import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";

import { ENVIRONMENT } from "../../../environment/environment-des";
import { BuscarQrCodePagamentoPort } from "../../../core/domain/ports/qrcode/buscar-qrcode-pagamento.port";
import { QrCodePagamentoResponseDto } from "../../../core/application/dto/response/qrcode-pagamento-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarQrCodePagamentoAdapter extends BuscarQrCodePagamentoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarQrCodePagamento(idInscricao: number): Observable<QrCodePagamentoResponseDto> {
    let params = new HttpParams()
    params = params.append('idInscricao', idInscricao.toString());

    return this.http.get<QrCodePagamentoResponseDto>(`${ENVIRONMENT.URL_API}/${ControllersEnum.QrCode}/${ENVIRONMENT.VERSAO}/pagamento`, { params }).pipe(
      catchError((error) => {
        
        return of(null);
      })
    );
  }
}