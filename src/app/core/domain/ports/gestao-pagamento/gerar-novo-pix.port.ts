import { Observable } from "rxjs";
import { ResponsePadraoDto } from "../../../application/dto/response/response-padrao.dto";

export abstract class GerarNovoPixPort {
  abstract gerarNovoPix(idInscricao: number): Observable<ResponsePadraoDto<null>>;
}