import { Observable } from "rxjs";
import { ProximoEventoResponseDto } from "../../../application/dto/response/proximo-evento-response.dto";

export abstract class BuscarProximoEventoPort {
  abstract buscarProximoEvento(idRegiao: number): Observable<ProximoEventoResponseDto | null>;
}