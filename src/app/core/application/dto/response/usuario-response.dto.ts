import { TabelaDominioResponseDto } from './tabela-dominio-response.dto';

export interface UsuarioResponseDto {
  id: number;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string | null;
  nascimento: string;
  pcd: string;
  possuiDons: boolean;
  possuiFilhos: boolean;
  filhos: number;
  qrCodePagamento: string | null;
  dhExclusao: string | null;
  tipoUsuario: TabelaDominioResponseDto;
  classe: TabelaDominioResponseDto;
  igreja: TabelaDominioResponseDto;
  condicoesMedica: string[];
  funcoesIgreja: string[];
  instrumentos: string[];
}
