import { Observable } from "rxjs";

export abstract class DeletarInstrumentoPort {
  abstract deletarInstrumento(id: number): Observable<null>;
}