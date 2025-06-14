export class UsuarioRequestDto {
  nomeCompleto: string
  cpf: string
  senha: string
  email: string
  telefone: string
  nascimento: string
  pcd: string
  dons: boolean
  idIgreja: number
  idClasse: number
  condicoesMedicas: number[]
  instrumentos: number[]
  funcoesIgreja: number[]
}