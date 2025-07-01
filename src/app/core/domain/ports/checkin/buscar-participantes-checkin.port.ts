import { Observable } from "rxjs";
import { CheckinRequestDto } from "../../../application/dto/request/checkin-request.dto";
import { CheckinResponseDto } from "../../../application/dto/response/checkin-response-response.dto";

export abstract class BuscarParticipantesCheckinPort {
  abstract buscarParticipantesCheckin(checkinRequest: CheckinRequestDto): Observable< CheckinResponseDto | null>;
}