import { Observable } from "rxjs";
import { InscricaoRequestDto } from "../../../application/dto/request/inscricao-request.dto";

export abstract class InserirInscricaoPort {
  abstract inserirInscricao(inscricao: InscricaoRequestDto): Observable<null>;
}