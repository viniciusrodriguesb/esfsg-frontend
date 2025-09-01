import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirRegiaoPort } from "../../../domain/ports/regiao/inserir-regiao.port";

@Injectable({ providedIn: 'root' })
export class InserirRegiaoUseCase {
  constructor(private readonly inserirRegiaoPort: InserirRegiaoPort) {}

  execute(descricao: string): Observable<null> {
    return this.inserirRegiaoPort.inserirRegiao(descricao);
  }
}