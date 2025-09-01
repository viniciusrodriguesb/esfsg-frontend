import { Observable } from "rxjs";

export abstract class InserirPastorPort {
  abstract inserirPastor(descricao: string): Observable<null>;
}