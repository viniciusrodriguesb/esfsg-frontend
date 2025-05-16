import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletarCondicaoMedicaPort } from "../../../domain/ports/condicao-medica/deletar-condicao-medica.port";

@Injectable({ providedIn: 'root' })
export class DeletarCondicaoMedicaUseCase {
  constructor(private readonly deletarCondicaoMedicaPort: DeletarCondicaoMedicaPort) {}

  execute(id: number): Observable<null> {
    return this.deletarCondicaoMedicaPort.deletarCondicaoMedica(id);
  }
}