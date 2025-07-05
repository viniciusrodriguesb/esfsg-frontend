import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InserirInscricaoPort } from "../../../domain/ports/inscricao/inserir-inscricao.port";
import { InscricaoRequestDto } from "../../dto/request/inscricao-request.dto";
import { UsuarioResponseDto } from "../../dto/response/usuario-response.dto";

@Injectable({ providedIn: 'root' })
export class InserirInscricaoUseCase {
  constructor(private readonly inserirInscricaoPort: InserirInscricaoPort) {}

  execute(inscricao: InscricaoRequestDto): Observable<UsuarioResponseDto> {
    return this.inserirInscricaoPort.inserirInscricao(inscricao);
  }
}