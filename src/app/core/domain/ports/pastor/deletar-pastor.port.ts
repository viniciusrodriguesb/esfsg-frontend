import { Observable } from "rxjs";

export abstract class DeletarPastorPort {
  abstract deletarPastor(id: number): Observable<null>;
}