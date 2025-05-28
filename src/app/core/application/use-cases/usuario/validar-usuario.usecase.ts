import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ValidarUsuarioPort } from "../../../domain/ports/usuario/validar-usuario.port";
import { UsuarioResponseDto } from "../../dto/response/usuario-response.dto";

@Injectable({ providedIn: 'root' })
export class ValidarUsuarioUseCase {
  constructor(private readonly validarUsuarioPort: ValidarUsuarioPort) {}

  execute(cpf: string): Observable<UsuarioResponseDto | null> {
    return this.validarUsuarioPort.validarUsuario(cpf);
  }
}
