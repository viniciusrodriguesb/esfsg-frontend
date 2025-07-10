import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfirmarPagamentoPort } from '../../../domain/ports/gestao-pagamento/confirmar-pagamento-manualmente.port';

@Injectable({ providedIn: 'root' })
export class ConfirmarPagamentoManualmenteUseCase {
  constructor(private readonly confirmarPagamentoPort: ConfirmarPagamentoPort) {}

  execute(idInscricao: number): Observable<void | null> {
    return this.confirmarPagamentoPort.confirmarPagamentoManualmente(idInscricao);
  }

}
