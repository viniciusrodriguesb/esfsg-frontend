import { Observable } from 'rxjs';

export abstract class InserirIgrejaPort {
  abstract inserirIgreja(descricao: string): Observable<null>;
}