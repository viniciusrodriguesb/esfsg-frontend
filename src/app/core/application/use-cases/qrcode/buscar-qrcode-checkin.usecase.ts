import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarQrCodeCheckinPort } from "../../../domain/ports/qrcode/buscar-qrcode-checkin.port";
import { QrCodeCheckinResponseDto } from "../../dto/response/qrcode-checkin-response.dto";


@Injectable({ providedIn: 'root' })
export class BuscarQrCodeCheckinUseCase {
  constructor(private readonly buscarQrCodeCheckinPort: BuscarQrCodeCheckinPort) {}

  execute(idInscricao: number): Observable<QrCodeCheckinResponseDto | null> {
    return this.buscarQrCodeCheckinPort.buscarQrCodeCheckin(idInscricao);
  }
}