import { Observable } from 'rxjs';

export abstract class EditarIgrejaPort {
  abstract editarIgreja(id: number, descricao: string): Observable<null>;
}