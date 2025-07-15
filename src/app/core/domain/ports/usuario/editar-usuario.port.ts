import { Observable } from "rxjs";
import { EdicaoUsuarioRequestDto } from "../../../application/dto/request/edicao-usuario-request.dto";
import { ResponsePadraoDto } from "../../../application/dto/response/response-padrao.dto";

export abstract class EditarUsuarioPort {
  abstract editarUsuario(usuario: EdicaoUsuarioRequestDto): Observable<ResponsePadraoDto<null>>;
}