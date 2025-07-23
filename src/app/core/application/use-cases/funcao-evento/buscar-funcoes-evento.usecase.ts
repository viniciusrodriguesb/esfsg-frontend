import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarTodasFuncoesEventoPort } from "../../../domain/ports/funcao-evento/buscar-todas-funcoes-evento.port";
import { FuncaoEventoResponse } from "../../dto/response/funcoes-eventoresponse.dto";

@Injectable({ providedIn: 'root' })
export class BuscarFuncoesEventoUseCase {
  constructor(private readonly buscarTodasFuncoesEventoPort: BuscarTodasFuncoesEventoPort) {}

  execute(): Observable<FuncaoEventoResponse[] | null> {
    return this.buscarTodasFuncoesEventoPort.buscarTodasFuncoesEvento();
  }
}