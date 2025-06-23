import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarInscricaoPort } from "../../../domain/ports/inscricao/buscar-inscricao.port";
import { InscricaoResponseDto } from "../../dto/response/inscricao-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarInscricaoUseCase {
  constructor(private readonly buscarInscricaoPort: BuscarInscricaoPort) {}

  execute(idEvento: number, IdUsuario: number): Observable<InscricaoResponseDto | null> {
    return this.buscarInscricaoPort.buscarInscricao(idEvento, IdUsuario);
  }
}