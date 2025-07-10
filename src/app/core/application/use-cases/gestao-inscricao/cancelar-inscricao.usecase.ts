import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CancelarInscricaoPort } from "../../../domain/ports/gestao-inscricao/cancelar-inscricao.port";

@Injectable({ providedIn: 'root' })
export class CancelarInscricaoUseCase {
  constructor(private readonly cancelarInscricaoPort: CancelarInscricaoPort) {}

  executar(ids: number[]): Observable<void | null>{
    return this.cancelarInscricaoPort.cancelarInscricoes(ids);
  }

}