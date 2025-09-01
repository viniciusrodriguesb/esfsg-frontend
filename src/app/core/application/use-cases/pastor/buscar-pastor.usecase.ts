import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { BuscarPastorPort } from "../../../domain/ports/pastor/buscar-pastor.port";

@Injectable({ providedIn: 'root' })
export class BuscarPastorUseCase {
  constructor(private readonly buscarPastorPort: BuscarPastorPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarPastorPort.buscarPastores();
  }
}