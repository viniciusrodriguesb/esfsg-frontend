import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ValidarQrCodeParticipantePort } from "../../../domain/ports/checkin/validar-qrcode-participante.port";
import { ValidacaoQrCodeParticipanteRequestDto } from "../../dto/request/validacao-checkin-request.dto";
import { ValidacaoQrCodeParticipanteResponseDto } from "../../dto/response/validacao-checkin-response.dto";

@Injectable({ providedIn: 'root' })
export class ValidarQrCodeParticipanteUseCase {
  constructor(private readonly validarQrCodeParticipantePort: ValidarQrCodeParticipantePort) {}

  execute(request: ValidacaoQrCodeParticipanteRequestDto): Observable<ValidacaoQrCodeParticipanteResponseDto> {
    return this.validarQrCodeParticipantePort.validarQrCodeParticipante(request);
  }
}
