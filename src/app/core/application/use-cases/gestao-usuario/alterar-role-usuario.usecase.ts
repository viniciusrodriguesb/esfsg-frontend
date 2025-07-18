import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AlterarRoleUsuarioPort } from "../../../domain/ports/gestao-usuario/alterar-role-usuario.port";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";
import { AlterarRoleUsuarioRequest } from "../../dto/request/alterar-role-usuario-request.dto";

@Injectable({ providedIn: 'root' })
export class AlterarRoleUsuarioUseCase {
  constructor(private readonly alterarRoleUsuariosPort: AlterarRoleUsuarioPort) {}

  execute(request: AlterarRoleUsuarioRequest): Observable<ResponsePadraoDto<null> | null> {
    return this.alterarRoleUsuariosPort.alterarRole(request);
  }

}