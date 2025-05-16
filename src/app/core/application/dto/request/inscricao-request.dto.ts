export interface InscricaoRequestDto {
  nome: string
  limiteInscricoesIntegral: number
  limiteInscricoesParcial: number
  dhEvento: string
  linkGrupoWpp: string
  valorInscricaoIntegral: number
  valorInscricaoParcial: number
  idIgrejaVigilia: number
  idIgrejaEvento: number
}