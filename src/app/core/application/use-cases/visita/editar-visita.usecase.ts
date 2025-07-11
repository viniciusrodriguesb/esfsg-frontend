import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";
import { EditarVisitaPort } from "../../../domain/ports/visita/editar-visita.port";
import { EditarVisitaRequestDto } from "../../dto/request/editar-visita-request.dto";

@Injectable({ providedIn: 'root' })
export class EditarVisitaUseCase {
  constructor(private readonly editarVisitaPort: EditarVisitaPort) {}

  execute(request: EditarVisitaRequestDto): Observable<ResponsePadraoDto<EditarVisitaRequestDto> | null> {
    return this.editarVisitaPort.editarVisita(request);
  }
}