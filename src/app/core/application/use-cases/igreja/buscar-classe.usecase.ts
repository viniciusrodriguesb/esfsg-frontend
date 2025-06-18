import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { Injectable } from "@angular/core";
import { BuscarIgrejaPort } from "../../../domain/ports/igreja/buscar-igreja.port";

@Injectable({ providedIn: 'root' })
export class BuscarIgrejaUseCase {
  constructor(private readonly buscarIgrejaPort: BuscarIgrejaPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarIgrejaPort.buscarIgrejas();
  }
}
