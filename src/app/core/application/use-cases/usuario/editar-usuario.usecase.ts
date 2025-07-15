import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarUsuarioPort } from "../../../domain/ports/usuario/editar-usuario.port";
import { EdicaoUsuarioRequestDto } from "../../dto/request/edicao-usuario-request.dto";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";

@Injectable({ providedIn: 'root' })
export class EditarUsuarioUseCase {
  constructor(private readonly editarUsuarioPort: EditarUsuarioPort) {}

  execute(request: EdicaoUsuarioRequestDto): Observable<ResponsePadraoDto<null>> {
    return this.editarUsuarioPort.editarUsuario(request);
  }
}