import { Observable } from "rxjs";
import { UsuarioAdminResponseDto } from "../../../application/dto/response/usuario-admin.dto";

export abstract class BuscarUsuarioAdminPort {
  abstract buscarUsuarioAdmin(cpf: string, senha: string): Observable<UsuarioAdminResponseDto | null>;
}