import { Observable } from "rxjs";

export abstract class DeletarCondicaoMedicaPort {
  abstract deletarCondicaoMedica(id: number): Observable<null>;
}