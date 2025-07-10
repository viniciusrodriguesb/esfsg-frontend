import { Observable } from "rxjs";
import { VisitaResponseDto } from "../../../application/dto/response/visita-response.dto";

export abstract class BuscarVisitaPort {
  abstract buscarVisita(): Observable<VisitaResponseDto[] | null>;
}