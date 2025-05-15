import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../infrastructure/adapter/dto/response/tabela-dominio-response.dto";
import { BuscarClassePort } from "../../domain/ports/buscar-classe.port";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BuscarClasseUseCase {
  constructor(private readonly buscarClassePort: BuscarClassePort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarClassePort.buscarClasses();
  }
}
