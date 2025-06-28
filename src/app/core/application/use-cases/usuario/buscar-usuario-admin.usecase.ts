import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarUsuarioAdminPort } from "../../../domain/ports/usuario/buscar-usuario-admin.port";
import { UsuarioAdminResponseDto } from "../../dto/response/usuario-admin.dto";

@Injectable({ providedIn: 'root' })
export class BuscarUsuarioAdminUseCase {
  constructor(private readonly buscarUsuarioAdminPort: BuscarUsuarioAdminPort) {}

  execute(cpf: string, senha: string): Observable<UsuarioAdminResponseDto | null> {
    return this.buscarUsuarioAdminPort.buscarUsuarioAdmin(cpf, senha);
  }
}
