export interface DadosDashboardResponseDto {
  inscritos: Inscritos
  inscritosPeriodo: InscritosPeriodo
  inscritosVisita: InscritosVisita
  arrecadacao: Arrecadacao
}

export interface Inscritos {
  confirmados: Confirmados
  aguardandoLiberacao: AguardandoLiberacao
  pendentes: Pendentes
  cancelados: Cancelados
  reembolsoSolicitado: ReembolsoSolicitado
}

export interface Confirmados {
  idStatus: number
  quantidade: number
  percentual: number
}

export interface AguardandoLiberacao {
  idStatus: number
  quantidade: number
  percentual: number
}

export interface Pendentes {
  idStatus: number
  quantidade: number
  percentual: number
}

export interface Cancelados {
  idStatus: number
  quantidade: number
  percentual: number
}

export interface ReembolsoSolicitado {
  idStatus: number
  quantidade: number
  percentual: number
}

export interface InscritosPeriodo {
  quantidadeInscritosIntegral: number
  quantidadeLiberadaIntegral: number
  quantidadeInscritosTarde: number
  quantidadeLiberadaTarde: number
}

export interface InscritosVisita {
  inscritosDisponiveisVisita: number
  inscritosAlocados: number
  totalVisitas: number
}

export interface Arrecadacao {
  total: string
  valorArrecadadoIntegral: string
  valorArrecadadoParcial: string
}
