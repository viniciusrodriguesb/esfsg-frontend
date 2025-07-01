import { Observable } from "rxjs";
import { ValidacaoQrCodeParticipanteRequestDto } from "../../../application/dto/request/validacao-checkin-request.dto";
import { ValidacaoQrCodeParticipanteResponseDto } from "../../../application/dto/response/validacao-checkin-response.dto";

export abstract class ValidarQrCodeParticipantePort {
  abstract validarQrCodeParticipante(request: ValidacaoQrCodeParticipanteRequestDto): Observable< ValidacaoQrCodeParticipanteResponseDto>;
}