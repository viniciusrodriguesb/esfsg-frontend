import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarPeriodoEventoPort } from "../../../domain/ports/evento/buscar-periodo-evento.port";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarPeriodoEventoUseCase {
  constructor(private readonly buscarPeriodoEventoPort: BuscarPeriodoEventoPort) {}

  execute(idEvento: number): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarPeriodoEventoPort.buscarPeriodoEvento(idEvento);
  }
}