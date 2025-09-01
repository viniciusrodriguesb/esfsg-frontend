import { Observable } from "rxjs";

export abstract class EditarPastorPort {
  abstract editarPastor(id: number, descricao: string): Observable<null>;
}