import { Observable } from "rxjs";
import { AlocacaoInscritoVisitaRequestDto } from "../../../application/dto/request/alocacao-inscrito-visita-request.dto";
import { ResponsePadraoDto } from "../../../application/dto/response/response-padrao.dto";

export abstract class AlocarInscritosVisitaPort {
  abstract alocarInscritoVisita(request: AlocacaoInscritoVisitaRequestDto[]): Observable<ResponsePadraoDto<null>>;
}