import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BuscarParticipantesCheckinPort } from "../../../domain/ports/checkin/buscar-participantes-checkin.port";
import { CheckinResponseDto } from "../../dto/response/checkin-response-response.dto";
import { CheckinRequestDto } from "../../dto/request/checkin-request.dto";

@Injectable({ providedIn: 'root' })
export class BuscarParticipantesCheckinUseCase {
  constructor(private readonly buscarParticipantesCheckinPort: BuscarParticipantesCheckinPort) {}

  execute(checkinRequest: CheckinRequestDto): Observable<CheckinResponseDto | null> {
    return this.buscarParticipantesCheckinPort.buscarParticipantesCheckin(checkinRequest);
  }
}
