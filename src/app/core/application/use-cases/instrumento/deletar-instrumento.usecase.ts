import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarInstrumentoPort } from "../../../domain/ports/instrumento/deletar-instrumento.port";

@Injectable({ providedIn: 'root' })
export class DeletarInstrumentoUseCase {
  constructor(private readonly deletarInstrumentoPort: DeletarInstrumentoPort) {}

  execute(id: number): Observable<null> {
    return this.deletarInstrumentoPort.deletarInstrumento(id);
  }
}