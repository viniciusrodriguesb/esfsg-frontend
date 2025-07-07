import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarFuncoesVisitaPort } from "../../../domain/ports/visita/buscar-funcoes-visita.port";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarFuncoesVisitaUseCase {
  constructor(private readonly buscarFuncoesVisitaPort: BuscarFuncoesVisitaPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarFuncoesVisitaPort.buscarFuncoesVisita();
  }
}
