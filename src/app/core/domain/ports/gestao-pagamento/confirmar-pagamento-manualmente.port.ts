import { Observable } from "rxjs";

export abstract class ConfirmarPagamentoPort {
  abstract confirmarPagamentoManualmente(idInscricao: number[]): Observable<void>;
}