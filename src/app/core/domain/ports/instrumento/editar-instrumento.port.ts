import { Observable } from "rxjs";

export abstract class EditarInstrumentoPort {
  abstract editarInstrumento(id: number, descricao: string): Observable<null>;
}