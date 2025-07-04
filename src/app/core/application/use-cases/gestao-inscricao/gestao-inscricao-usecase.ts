import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GestaoInscricaoPort } from "../../../domain/ports/gestao-inscricao/gestao-inscricao.port";
import { FiltroInscricaoRequest, InscricoesPendentesRequestDto } from "../../dto/request/inscricoes-pendentes-request.dto";
import { GestaoInscricaoResponse, InscricaoParaLiberacaoResponse } from "../../dto/response/inscricoes-response-dto";
import { PaginacaoResponse } from "../../dto/response/paginacao-response.dto";

@Injectable({ providedIn: 'root' })
export class GestaoInscricaoUseCase {
  constructor(private readonly gestaoInscricaoPort: GestaoInscricaoPort) {}

  executePendentes(request: InscricoesPendentesRequestDto): Observable<PaginacaoResponse<InscricaoParaLiberacaoResponse> | null> {
    return this.gestaoInscricaoPort.buscarInscricaoPendente(request);
  }

  executeTodas(filtro: FiltroInscricaoRequest): Observable<PaginacaoResponse<GestaoInscricaoResponse> | null> {
    return this.gestaoInscricaoPort.buscarInscricao(filtro);
  }

  executarAprovacao(ids: number[]): Observable<void | null>{
    return this.gestaoInscricaoPort.aprovarInscricao(ids);
  }
}