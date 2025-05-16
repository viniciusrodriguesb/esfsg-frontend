import { Observable } from "rxjs";

export abstract class DeletarInscricaoPort {
  abstract deletarInscricao(id: number): Observable<null>;
}