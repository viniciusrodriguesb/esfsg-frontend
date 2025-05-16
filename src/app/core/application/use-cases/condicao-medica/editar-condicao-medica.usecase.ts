import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarCondicaoMedicaPort } from "../../../domain/ports/condicao-medica/editar-condicao-medica.port";

@Injectable({ providedIn: 'root' })
export class EditarCondicaoMedicaUseCase {
  constructor(private readonly editarCondicaoMedicaPort: EditarCondicaoMedicaPort) {}

  execute(id: number, descricao: string): Observable<null> {
    return this.editarCondicaoMedicaPort.editarCondicaoMedica(id, descricao);
  }
}