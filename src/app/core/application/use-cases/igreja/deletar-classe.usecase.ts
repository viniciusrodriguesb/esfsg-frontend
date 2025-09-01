import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarIgrejaPort } from "../../../domain/ports/igreja/deletar-igreja.port";

@Injectable({ providedIn: 'root' })
export class DeletarIgrejaUseCase {
  constructor(private readonly deletarIgrejaPort: DeletarIgrejaPort) {}

  execute(id: number): Observable<null> {
    return this.deletarIgrejaPort.deletarIgreja(id);
  }
}