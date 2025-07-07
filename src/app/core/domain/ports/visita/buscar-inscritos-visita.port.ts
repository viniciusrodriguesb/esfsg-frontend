import { Observable } from "rxjs";
import { PaginacaoResponse } from "../../../application/dto/response/paginacao-response.dto";
import { InscritoVisitaResponseDto } from "../../../application/dto/response/incritos-visita-response.dto";
import { InscritoVisitaRequestDto } from "../../../application/dto/request/inscrito-visita-request.dto";

export abstract class BuscarInscritosVisitaPort {
  abstract buscarInscritosVisita(request: InscritoVisitaRequestDto): Observable<PaginacaoResponse<InscritoVisitaResponseDto> | null>;
}