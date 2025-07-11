import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeletarVisitaPort } from '../../../domain/ports/visita/deletar-visita.port';

@Injectable({ providedIn: 'root' })
export class DeletarVisitaUseCase {
  constructor(private readonly deletarVisitaPort: DeletarVisitaPort) {}

  execute(id: number): Observable<null> {
    return this.deletarVisitaPort.deletarVisita(id);
  }
}
