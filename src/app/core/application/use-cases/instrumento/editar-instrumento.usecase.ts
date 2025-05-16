import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarInstrumentoPort } from "../../../domain/ports/instrumento/editar-instrumento.port";

@Injectable({ providedIn: 'root' })
export class EditarInstrumentoUseCase {
  constructor(private readonly editarInstrumentoPort: EditarInstrumentoPort) {}

  execute(id: number, descricao: string): Observable<null> {
    return this.editarInstrumentoPort.editarInstrumento(id, descricao);
  }
}