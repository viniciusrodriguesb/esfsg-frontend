import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { BuscarFuncaoIgrejaPort } from "../../../domain/ports/funcao/buscar-funcao-igreja.port";

@Injectable({ providedIn: 'root' })
export class BuscarFuncaoIgrejaUseCase {
  constructor(private readonly buscarFuncaoIgrejaPort: BuscarFuncaoIgrejaPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarFuncaoIgrejaPort.buscarFuncaoIgreja();
  }
}