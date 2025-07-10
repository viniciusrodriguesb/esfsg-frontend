import { Observable } from 'rxjs';
import { PaginacaoResponse } from '../../../application/dto/response/paginacao-response.dto';
import { GestaoPagamentoRequestDto } from '../../../application/dto/request/gestao-pagamento-request.dto';
import { GestaoPagamentoResponseDto } from '../../../application/dto/response/gestao-pagamento-response.dto';

export abstract class BuscarInscricoesPagamentoPort {
  abstract buscarInscricoesPagamento(
    request: GestaoPagamentoRequestDto
  ): Observable<PaginacaoResponse<GestaoPagamentoResponseDto>>;
}
