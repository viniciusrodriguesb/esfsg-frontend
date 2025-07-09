import { TabelaDominioResponseDto } from "./tabela-dominio-response.dto"

export interface InscricaoParaLiberacaoResponse {
  id: number;
  nome: string;
  idade: number;
  classe: string;
  periodo: string;
  funcaoEvento: string;
  igreja: string;
  usuarioBloqueado?: DadosBloqueio;
  dependentes?: DependenteResponse[];
}

export interface DependenteResponse {
  nomeDependente: string;
  idadeDependente: number;
}

export interface DadosBloqueio {
  usuarioBloqueado: boolean;
  motivoBloqueio: string;
}

export interface GestaoInscricaoResponse {
  nome: string;
  igreja: string;
  classe: string;
  telefone: string;
  funcaoEvento: string;
  periodo: string;
  funcaoVisita: string;
  qntdDependentes: number;
  status: TabelaDominioResponseDto;
}