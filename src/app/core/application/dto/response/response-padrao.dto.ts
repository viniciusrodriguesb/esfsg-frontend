export class ResponsePadraoDto<T> {
  sucesso: boolean;
  mensagem: string;
  dados: T | null;
}