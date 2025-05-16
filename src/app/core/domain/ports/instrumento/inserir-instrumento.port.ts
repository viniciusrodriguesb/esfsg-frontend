import { Observable } from "rxjs";

export abstract class InserirInstrumentoPort {
  abstract inserirInstrumento(descricao: string): Observable<null>;
}