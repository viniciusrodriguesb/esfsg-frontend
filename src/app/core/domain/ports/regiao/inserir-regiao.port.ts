import { Observable } from 'rxjs';

export abstract class InserirRegiaoPort {
  abstract inserirRegiao(descricao: string): Observable<null>;
}