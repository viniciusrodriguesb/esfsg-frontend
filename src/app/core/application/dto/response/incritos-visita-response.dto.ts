export interface InscritoVisitaResponseDto {
  nome: string
  funcaoEvento: string
  dadosVisita: DadosVisita
  idInscricao: number
}

export interface DadosVisita {
  nomeVisita: string
  funcao: string
  vagasCarro: number
  endereco: string
  carro: boolean
  alocado: boolean
}
