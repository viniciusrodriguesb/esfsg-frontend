import { Observable } from "rxjs";

export abstract class DeletarVisitaPort {
  abstract deletarVisita(id: number): Observable<null>;
}