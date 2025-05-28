import { Observable } from "rxjs";
import { UsuarioResponseDto } from "../../../application/dto/response/usuario-response.dto";

export abstract class ValidarUsuarioPort {
  abstract validarUsuario(cpf: string): Observable<UsuarioResponseDto | null>;
}