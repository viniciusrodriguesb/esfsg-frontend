import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirInscricaoPort } from "../../../domain/ports/inscricao/inserir-inscricao.port";
import { InscricaoRequestDto } from "../../dto/request/inscricao-request.dto";

@Injectable({ providedIn: 'root' })
export class InserirInscricaoUseCase {
  constructor(private readonly inserirInscricaoPort: InserirInscricaoPort) {}

  execute(inscricao: InscricaoRequestDto): Observable<null> {
    return this.inserirInscricaoPort.inserirInscricao(inscricao);
  }
}