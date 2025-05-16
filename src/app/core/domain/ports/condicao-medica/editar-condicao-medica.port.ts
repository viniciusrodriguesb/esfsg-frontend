import { Observable } from "rxjs";

export abstract class EditarCondicaoMedicaPort {
  abstract editarCondicaoMedica(id: number, descricao: string): Observable<null>;
}