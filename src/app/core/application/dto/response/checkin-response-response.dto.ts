export interface CheckinResponseDto {
  paginaAtual: number
  tamanhoPagina: number
  totalItens: number
  totalPaginas: number
  itens: ItemCheckinDto[]
}

export interface ItemCheckinDto {
  idCheckin: number
  presenca: boolean
  nome: string
  igreja: IgrejaCheckinDto
  evento: EventoCheckinDto
}

export interface IgrejaCheckinDto {
  igreja: string
  classe: string
}

export interface EventoCheckinDto {
  periodo: string
  funcaoEvento: string
}