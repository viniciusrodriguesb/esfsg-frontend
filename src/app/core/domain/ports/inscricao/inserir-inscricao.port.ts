import { Observable } from "rxjs";
import { InscricaoRequestDto } from "../../../application/dto/request/inscricao-request.dto";
import { UsuarioResponseDto } from "../../../application/dto/response/usuario-response.dto";

export abstract class InserirInscricaoPort {
  abstract inserirInscricao(inscricao: InscricaoRequestDto): Observable<UsuarioResponseDto>;
}