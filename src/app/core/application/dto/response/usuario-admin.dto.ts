export class UsuarioAdminResponseDto {
  sucesso: boolean
  mensagem: string
  dados: DadosUsuarioAdminResponseDto
}

export class DadosUsuarioAdminResponseDto {
  id: number
  nome: string
  cpf: string
  role: number
}