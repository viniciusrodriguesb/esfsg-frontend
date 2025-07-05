export interface PaginacaoResponse<T> {
  itens: T[];
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  tamanhoPagina: number;
}