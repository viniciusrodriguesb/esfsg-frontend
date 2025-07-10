import { StatusPagamentoInscricaoEnum } from "../../../domain/enums/status-pagamento-inscricao.enum";

export class GestaoPagamentoRequestDto {
  idEvento : number;
  nome?: string;
  status?: StatusPagamentoInscricaoEnum
  pagina?: number;
  tamanhoPagina?: number;
}