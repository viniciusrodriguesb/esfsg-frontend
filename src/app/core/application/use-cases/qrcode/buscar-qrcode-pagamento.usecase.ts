import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarQrCodePagamentoPort } from "../../../domain/ports/qrcode/buscar-qrcode-pagamento.port";
import { QrCodePagamentoResponseDto } from "../../dto/response/qrcode-pagamento-response.dto";


@Injectable({ providedIn: 'root' })
export class BuscarQrCodePagamentoUseCase {
  constructor(private readonly buscarQrCodePagamentoPort: BuscarQrCodePagamentoPort) {}

  execute(idInscricao: number): Observable<QrCodePagamentoResponseDto | null> {
    return this.buscarQrCodePagamentoPort.buscarQrCodePagamento(idInscricao);
  }
}