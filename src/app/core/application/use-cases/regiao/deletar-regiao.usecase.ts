import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarRegiaoPort } from "../../../domain/ports/regiao/deletar-regiao.port";

@Injectable({ providedIn: 'root' })
export class DeletarRegiaoUseCase {
  constructor(private readonly deletarRegiaoPort: DeletarRegiaoPort) {}

  execute(id: number): Observable<null> {
    return this.deletarRegiaoPort.deletarRegiao(id);
  }
}