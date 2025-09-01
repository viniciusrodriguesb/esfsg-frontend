import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarPastorPort } from "../../../domain/ports/pastor/editar-pastor.port";

@Injectable({ providedIn: 'root' })
export class EditarPastorUseCase {
  constructor(private readonly editarPastorPort: EditarPastorPort) {}

  execute(id: number, descricao: string): Observable<null> {
    return this.editarPastorPort.editarPastor(id, descricao);
  }
}