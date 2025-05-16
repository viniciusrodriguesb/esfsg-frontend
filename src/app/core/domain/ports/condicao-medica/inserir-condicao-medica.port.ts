import { Observable } from "rxjs";

export abstract class InserirCondicaoMedicaPort {
  abstract inserirCondicaoMedica(descricao: string): Observable<null>;
}