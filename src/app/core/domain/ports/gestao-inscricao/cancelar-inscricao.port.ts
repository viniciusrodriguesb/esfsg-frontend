import { Observable } from "rxjs";

export abstract class CancelarInscricaoPort {
  abstract cancelarInscricoes(request: number[]): Observable<void>;
}