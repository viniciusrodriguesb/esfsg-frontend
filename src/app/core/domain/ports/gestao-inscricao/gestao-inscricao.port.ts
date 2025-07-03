import { Observable } from "rxjs";
import { FiltroInscricaoRequest, InscricoesPendentesRequestDto } from "../../../application/dto/request/inscricoes-pendentes-request.dto";
import { PaginacaoResponse } from "../../../application/dto/response/paginacao-response.dto";
import { GestaoInscricaoResponse, InscricaoParaLiberacaoResponse } from "../../../application/dto/response/inscricoes-response-dto";

export abstract class GestaoInscricaoPort {
  abstract buscarInscricaoPendente(request: InscricoesPendentesRequestDto): Observable<PaginacaoResponse<InscricaoParaLiberacaoResponse>>;
  abstract buscarInscricao(request: FiltroInscricaoRequest): Observable<PaginacaoResponse<GestaoInscricaoResponse>>;
}