import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";
import { CriarVisitaPort } from "../../../domain/ports/visita/criar-visita.port";
import { CriarVisitaRequestDto } from "../../dto/request/criar-visita-request.dto";

@Injectable({ providedIn: 'root' })
export class CriarVisitaUseCase {
  constructor(private readonly criarVisitaPort: CriarVisitaPort) {}

  execute(request: CriarVisitaRequestDto): Observable<ResponsePadraoDto<CriarVisitaRequestDto> | null> {
    return this.criarVisitaPort.criarVisita(request);
  }
}