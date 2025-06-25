import { Observable } from "rxjs";
import { QrCodePagamentoResponseDto } from "../../../application/dto/response/qrcode-pagamento-response.dto";

export abstract class BuscarQrCodePagamentoPort {
  abstract buscarQrCodePagamento(idInscricao: number): Observable<QrCodePagamentoResponseDto | null>;
}