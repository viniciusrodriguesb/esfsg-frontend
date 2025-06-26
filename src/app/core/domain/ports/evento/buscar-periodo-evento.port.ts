import { Observable } from "rxjs";

export abstract class BuscarPeriodoEventoPort {
  abstract buscarPeriodoEvento(idEvento: number): Observable<string[] | null>;
}