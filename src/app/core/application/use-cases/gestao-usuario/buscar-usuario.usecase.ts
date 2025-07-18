import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { PaginacaoResponse } from "../../dto/response/paginacao-response.dto";
import { BuscarUsuariosPort } from "../../../domain/ports/gestao-usuario/buscar-usuarios.port";
import { BuscarUsuariosRequest } from "../../dto/request/buscar-usuarios-request.dto";
import { BuscarUsuarioResponseDto } from "../../dto/response/buscar-usuarios-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarUsuarioUseCase {
  constructor(private readonly buscarUsuariosPort: BuscarUsuariosPort) {}

  execute(request: BuscarUsuariosRequest): Observable<PaginacaoResponse<BuscarUsuarioResponseDto> | null> {
    return this.buscarUsuariosPort.buscarUsuarios(request);
  }

}