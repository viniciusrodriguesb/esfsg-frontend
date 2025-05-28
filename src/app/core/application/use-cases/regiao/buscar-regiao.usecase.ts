import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { Injectable } from "@angular/core";
import { BuscarRegiaoPort } from "../../../domain/ports/regiao/buscar-regiao.port";

@Injectable({ providedIn: 'root' })
export class BuscarRegiaoUseCase {
  constructor(private readonly buscarRegiaoPort: BuscarRegiaoPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarRegiaoPort.buscarRegioes();
  }
}
