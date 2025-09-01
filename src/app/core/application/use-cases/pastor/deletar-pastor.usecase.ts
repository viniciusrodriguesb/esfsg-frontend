import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarPastorPort } from "../../../domain/ports/pastor/deletar-pastor.port";

@Injectable({ providedIn: 'root' })
export class DeletarPastorUseCase {
  constructor(private readonly deletarPastorPort: DeletarPastorPort) {}

  execute(id: number): Observable<null> {
    return this.deletarPastorPort.deletarPastor(id);
  }
}