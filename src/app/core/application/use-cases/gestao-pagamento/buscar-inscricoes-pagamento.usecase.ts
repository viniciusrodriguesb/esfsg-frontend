import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BuscarInscricoesPagamentoPort } from "../../../domain/ports/gestao-pagamento/buscar-inscricoes-pagamento.port";
import { PaginacaoResponse } from "../../dto/response/paginacao-response.dto";
import { GestaoPagamentoResponseDto } from "../../dto/response/gestao-pagamento-response.dto";
import { GestaoPagamentoRequestDto } from "../../dto/request/gestao-pagamento-request.dto";

@Injectable({ providedIn: 'root' })
export class BuscarInscricoesPagamentoUseCase {
  constructor(private readonly buscarInscricoesPagamentoPort: BuscarInscricoesPagamentoPort) {}

  execute( request: GestaoPagamentoRequestDto): Observable<PaginacaoResponse<GestaoPagamentoResponseDto> | null> {
    return this.buscarInscricoesPagamentoPort.buscarInscricoesPagamento(request);
  }

}