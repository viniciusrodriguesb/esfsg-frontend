import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlocarInscritosVisitaPort } from "../../../domain/ports/visita/alocar-inscritos-visita.port";
import { AlocacaoInscritoVisitaRequestDto } from "../../dto/request/alocacao-inscrito-visita-request.dto";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";

@Injectable({ providedIn: 'root' })
export class AlocarInscritosVisitaUseCase {
  constructor(private readonly alocarInscritosVisitaPort: AlocarInscritosVisitaPort) {}

  execute(request: AlocacaoInscritoVisitaRequestDto[]): Observable<ResponsePadraoDto<null> | null> {
    return this.alocarInscritosVisitaPort.alocarInscritoVisita(request);
  }
}
