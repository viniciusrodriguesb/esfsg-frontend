import { Observable } from 'rxjs';

export abstract class DeletarRegiaoPort {
  abstract deletarRegiao(id: number): Observable<null>;
}