import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../../infrastructure/adapter/dto/response/tabela-dominio-response.dto";
import { BuscarEventoPort } from "../../../domain/ports/funcao/buscar-evento.port";

@Injectable({ providedIn: 'root' })
export class BuscarEventoUseCase {
  constructor(private readonly buscarEventoPort: BuscarEventoPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarEventoPort.buscarEvento();
  }
}