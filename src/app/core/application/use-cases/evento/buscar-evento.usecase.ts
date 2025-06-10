import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarEventoPort } from "../../../domain/ports/evento/buscar-evento.port";
import { EventoResponseDto } from "../../dto/response/evento-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarEventoUseCase {
  constructor(private readonly buscarEventoPort: BuscarEventoPort) {}

  execute(idRegiao: number): Observable<EventoResponseDto[] | null> {
    return this.buscarEventoPort.buscarEvento(idRegiao);
  }
}