import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarInscricaoPort } from "../../../domain/ports/inscricao/editar-inscricao.port";
import { InscricaoRequestDto } from "../../dto/request/inscricao-request.dto";

@Injectable({ providedIn: 'root' })
export class EditarInscricaoUseCase {
  constructor(private readonly editarInscricaoPort: EditarInscricaoPort) {}

  execute(id: number, inscricao: InscricaoRequestDto): Observable<null> {
    return this.editarInscricaoPort.editarInscricao(id, inscricao);
  }
}