import { Observable } from "rxjs";
import { ResponsePadraoDto } from "../../../application/dto/response/response-padrao.dto";
import { EditarVisitaRequestDto } from "../../../application/dto/request/editar-visita-request.dto";

export abstract class EditarVisitaPort {
  abstract editarVisita(request: EditarVisitaRequestDto): Observable<ResponsePadraoDto<EditarVisitaRequestDto>>;
}