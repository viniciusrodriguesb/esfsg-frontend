import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarIgrejaPort } from "../../../domain/ports/igreja/editar-igreja.port";

@Injectable({ providedIn: 'root' })
export class EditarIgrejaUseCase {
  constructor(private readonly editarIgrejaPort: EditarIgrejaPort) {}

  execute(id: number, descricao: string): Observable<null> {
    return this.editarIgrejaPort.editarIgreja(id, descricao);
  }
}