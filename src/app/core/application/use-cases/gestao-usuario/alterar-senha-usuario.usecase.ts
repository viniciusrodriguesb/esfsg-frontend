import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";
import { AlterarSenhaUsuarioRequest } from "../../dto/request/alterar-senha-usuario-request.dto";
import { AlterarSenhaUsuarioPort } from "../../../domain/ports/gestao-usuario/alterar-senha-usuario.port";

@Injectable({ providedIn: 'root' })
export class AlterarSenhaUsuarioUseCase {
  constructor(private readonly alterarSenhaUsuariosPort: AlterarSenhaUsuarioPort) {}

  execute(request: AlterarSenhaUsuarioRequest): Observable<ResponsePadraoDto<null> | null> {
    return this.alterarSenhaUsuariosPort.alterarSenha(request);
  }

}