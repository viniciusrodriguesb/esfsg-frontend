export interface ValidacaoQrCodeParticipanteResponseDto {
  sucesso: boolean
  mensagem: string
  dados: DadoParticipanteDto[]
}

export interface DadoParticipanteDto {
  nomeCompleto: string
  periodo: string
  grupo: string
  pulseira: any
  etiquetaVisita: any
  dependente: DadosDependenteDto[]
}

export interface DadosDependenteDto{
  nome: string
  cor: string
}
