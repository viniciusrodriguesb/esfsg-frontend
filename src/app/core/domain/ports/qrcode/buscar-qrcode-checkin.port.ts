import { Observable } from "rxjs";
import { QrCodeCheckinResponseDto } from "../../../application/dto/response/qrcode-checkin-response.dto";


export abstract class BuscarQrCodeCheckinPort {
  abstract buscarQrCodeCheckin(idInscricao: number): Observable<QrCodeCheckinResponseDto | null>;
}