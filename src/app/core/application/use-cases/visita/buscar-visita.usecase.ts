import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarVisitaPort } from "../../../domain/ports/visita/buscar-visita.port";
import { VisitaResponseDto } from "../../dto/response/visita-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarVisitaUseCase {
  constructor(private readonly buscarVisitaPort: BuscarVisitaPort) {}

  execute(descricao?: string): Observable<VisitaResponseDto[] | null> {
    return this.buscarVisitaPort.buscarVisita(descricao);
  }
}
