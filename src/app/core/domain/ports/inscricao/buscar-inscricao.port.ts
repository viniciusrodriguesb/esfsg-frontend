import { Observable } from "rxjs";
import { InscricaoResponseDto } from "../../../application/dto/response/inscricao-response.dto";

export abstract class BuscarInscricaoPort {
  abstract buscarInscricao(idEvento: number, IdUsuario: number): Observable<InscricaoResponseDto>;
}