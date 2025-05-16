import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirCondicaoMedicaPort } from "../../../domain/ports/condicao-medica/inserir-condicao-medica.port";

@Injectable({ providedIn: 'root' })
export class InserirCondicaoMedicaUseCase {
  constructor(private readonly inserirCondicaoMedicaPort: InserirCondicaoMedicaPort) {}

  execute(descricao: string): Observable<null> {
    return this.inserirCondicaoMedicaPort.inserirCondicaoMedica(descricao);
  }
}