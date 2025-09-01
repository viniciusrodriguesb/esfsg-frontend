import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirPastorPort } from "../../../domain/ports/pastor/inserir-pastor.port";

@Injectable({ providedIn: 'root' })
export class InserirPastorUseCase {
  constructor(private readonly inserirPastorPort: InserirPastorPort) {}

  execute(descricao: string): Observable<null> {
    return this.inserirPastorPort.inserirPastor(descricao);
  }
}