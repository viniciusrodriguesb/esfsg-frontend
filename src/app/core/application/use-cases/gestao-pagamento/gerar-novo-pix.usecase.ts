import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { GerarNovoPixPort } from "../../../domain/ports/gestao-pagamento/gerar-novo-pix.port";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";

@Injectable({ providedIn: 'root' })
export class GerarNovoPixUseCase {
  constructor(private readonly gerarNovoPixPort: GerarNovoPixPort) {}

  execute(idInscricao: number): Observable<ResponsePadraoDto<null> | null> {
    return this.gerarNovoPixPort.gerarNovoPix(idInscricao);
  }

}