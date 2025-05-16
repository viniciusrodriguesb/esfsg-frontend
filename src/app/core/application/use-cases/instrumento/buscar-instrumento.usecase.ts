import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarInstrumentoPort } from "../../../domain/ports/instrumento/buscar-instrumento.port";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarInstrumentoUseCase {
  constructor(private readonly buscarInstrumentoPort: BuscarInstrumentoPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarInstrumentoPort.buscarInstrumentos();
  }
}