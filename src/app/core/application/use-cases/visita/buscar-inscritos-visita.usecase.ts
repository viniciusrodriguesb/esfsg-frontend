import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarInscritosVisitaPort } from "../../../domain/ports/visita/buscar-inscritos-visita.port";
import { InscritoVisitaRequestDto } from "../../dto/request/inscrito-visita-request.dto";
import { InscritoVisitaResponseDto } from "../../dto/response/incritos-visita-response.dto";
import { PaginacaoResponse } from "../../dto/response/paginacao-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarInscritosVisitaUseCase {
  constructor(private readonly buscarInscritosVisitaPort: BuscarInscritosVisitaPort) {}

  execute(request: InscritoVisitaRequestDto): Observable<PaginacaoResponse<InscritoVisitaResponseDto> | null> {
    return this.buscarInscritosVisitaPort.buscarInscritosVisita(request);
  }
}
