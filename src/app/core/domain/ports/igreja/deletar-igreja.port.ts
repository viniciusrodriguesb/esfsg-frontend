import { Observable } from 'rxjs';

export abstract class DeletarIgrejaPort {
  abstract deletarIgreja(id: number): Observable<null>;
}
