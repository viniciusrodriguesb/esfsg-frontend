export class InscricoesPendentesRequestDto {
  idEvento ?: number;
  cpfLogado: string;
  pagina?: number;
  tamanhoPagina?: number;
}

export interface FiltroInscricaoRequest {
  idEvento ?: number;
  regiao?: number;
  nome?: string;
  igreja?: number;
  classe?: number;
  funcaoEvento?: number;
  periodo?: string;
  pagina?: number;
  tamanhoPagina?: number;
}