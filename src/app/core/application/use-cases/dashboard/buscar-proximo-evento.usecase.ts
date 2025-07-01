import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarProximoEventoPort } from "../../../domain/ports/dashboard/buscar-proximo-evento.port";
import { ProximoEventoResponseDto } from "../../dto/response/proximo-evento-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarProximoEventoUseCase {
  constructor(private readonly buscarProximoEventoPort: BuscarProximoEventoPort) {}

  execute(idRegiao: number): Observable<ProximoEventoResponseDto | null> {
    return this.buscarProximoEventoPort.buscarProximoEvento(idRegiao);
  }
}