export class CheckinRequestDto {
  idEvento : number;
  nome?: string;
  periodo?: string;
  funcaoEvento?: number[]; 
  validado?: boolean;
  pagina?: number;
  tamanhoPagina?: number;
}
