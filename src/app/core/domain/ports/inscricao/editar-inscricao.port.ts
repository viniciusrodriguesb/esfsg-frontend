import { Observable } from "rxjs";
import { InscricaoRequestDto } from "../../../application/dto/request/inscricao-request.dto";

export abstract class EditarInscricaoPort {
  abstract editarInscricao(id: number, inscricao: InscricaoRequestDto): Observable<null>;
}