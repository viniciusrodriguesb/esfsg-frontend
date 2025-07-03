export class InscricoesPendentesRequestDto {
  cpf: string;
  pagina?: number;
  tamanhoPagina?: number;
}

export interface FiltroInscricaoRequest {
  regiao?: number;
  nome?: string;
  igreja?: number;
  classe?: number;
  funcaoEvento?: number;
  periodo?: string;
  pagina?: number;
  tamanhoPagina?: number;
}