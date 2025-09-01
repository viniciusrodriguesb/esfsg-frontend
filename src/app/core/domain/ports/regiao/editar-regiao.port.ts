import { Observable } from 'rxjs';

export abstract class EditarRegiaoPort {
  abstract editarRegiao(id: number, descricao: string): Observable<null>;
}