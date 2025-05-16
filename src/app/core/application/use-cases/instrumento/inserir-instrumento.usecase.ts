import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirInstrumentoPort } from "../../../domain/ports/instrumento/inserir-instrumento.port";

@Injectable({ providedIn: 'root' })
export class InserirInstrumentoUseCase {
  constructor(private readonly inserirInstrumentoPort: InserirInstrumentoPort) {}

  execute(descricao: string): Observable<null> {
    return this.inserirInstrumentoPort.inserirInstrumento(descricao);
  }
}