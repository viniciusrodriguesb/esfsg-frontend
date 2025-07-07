import { Observable } from "rxjs";
import { EventoResponseDto } from "../../../application/dto/response/evento-response.dto";

export abstract class BuscarEventoPort {
  abstract buscarEvento(): Observable<EventoResponseDto[] | null>;
}