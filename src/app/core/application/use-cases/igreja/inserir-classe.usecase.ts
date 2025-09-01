import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirIgrejaPort } from "../../../domain/ports/igreja/inserir-igreja.port";

@Injectable({ providedIn: 'root' })
export class InserirIgrejaUseCase {
  constructor(private readonly inserirIgrejaPort: InserirIgrejaPort) {}

  execute(descricao: string): Observable<null> {
    return this.inserirIgrejaPort.inserirIgreja(descricao);
  }
}