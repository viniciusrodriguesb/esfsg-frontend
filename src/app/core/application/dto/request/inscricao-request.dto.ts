import { IgrejaRequestDto } from "./igreja-request.dto"
import { InscricaoMenorRequestDto } from "./inscricao-menor-request.dto"
import { UsuarioRequestDto } from "./usuario-request.dto"
import { VisitaRequestDto } from "./visita-request.dto"

export class InscricaoRequestDto {
  cpf: string = ''
  periodo: string = ''
  idFuncaoEvento: number = 0
  idEvento: number = 0
  visita: VisitaRequestDto = new VisitaRequestDto()
  usuario: UsuarioRequestDto = new UsuarioRequestDto()
  inscricaoMenor: InscricaoMenorRequestDto[] = []
  igreja: IgrejaRequestDto = new IgrejaRequestDto()
}