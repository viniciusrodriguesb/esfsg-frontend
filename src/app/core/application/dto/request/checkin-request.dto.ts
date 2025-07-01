export class CheckinRequestDto {
  nome?: string;
  periodo?: string;
  funcaoEvento?: number[]; 
  validado?: boolean;
  pagina?: number;
  tamanhoPagina?: number;
}
