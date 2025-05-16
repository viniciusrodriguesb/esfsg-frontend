import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarInscricaoPort } from "../../../domain/ports/inscricao/deletar-inscricao.port";

@Injectable({ providedIn: 'root' })
export class DeletarInscricaoUseCase {
  constructor(private readonly deletarInscricaoPort: DeletarInscricaoPort) {}

  execute(id: number): Observable<null> {
    return this.deletarInscricaoPort.deletarInscricao(id);
  }
}