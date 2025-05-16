import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../../infrastructure/adapter/dto/response/tabela-dominio-response.dto";
import { BuscarIgrejaPort } from "../../../domain/ports/funcao/buscar-igreja.port";

@Injectable({ providedIn: 'root' })
export class BuscarIgrejaUseCase {
  constructor(private readonly buscarIgrejaPort: BuscarIgrejaPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarIgrejaPort.buscarIgreja();
  }
}