import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { BuscarFuncaoEventoPort } from "../../../domain/ports/funcao/buscar-funcao-evento.port";

@Injectable({ providedIn: 'root' })
export class BuscarFuncaoEventoUseCase {
  constructor(private readonly buscarFuncaoEventoPort: BuscarFuncaoEventoPort) {}

  execute(idEvento: number): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarFuncaoEventoPort.buscarFuncaoEvento(idEvento);
  }
}