import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { BuscarClassePort } from "../../../domain/ports/classe/buscar-classe.port";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BuscarClasseUseCase {
  constructor(private readonly buscarClassePort: BuscarClassePort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarClassePort.buscarClasses();
  }
}
