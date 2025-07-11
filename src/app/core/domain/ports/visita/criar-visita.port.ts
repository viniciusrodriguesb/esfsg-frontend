import { Observable } from "rxjs";
import { ResponsePadraoDto } from "../../../application/dto/response/response-padrao.dto";
import { CriarVisitaRequestDto } from "../../../application/dto/request/criar-visita-request.dto";

export abstract class CriarVisitaPort {
  abstract criarVisita(request: CriarVisitaRequestDto): Observable<ResponsePadraoDto<CriarVisitaRequestDto>>;
}