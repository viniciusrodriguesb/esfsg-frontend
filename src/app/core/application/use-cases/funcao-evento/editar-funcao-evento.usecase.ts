import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarFuncaoEventoPort } from "../../../domain/ports/funcao-evento/editar-funcao-evento.port";
import { ResponsePadraoDto } from "../../dto/response/response-padrao.dto";
import { EditarFuncaoEventoRequest } from "../../dto/request/editar-funcao-evento-request.dto";

@Injectable({ providedIn: 'root' })
export class EditarFuncaoEventoUseCase {
  constructor(private readonly editarFuncaoEventoPort: EditarFuncaoEventoPort) {}

  execute(request: EditarFuncaoEventoRequest): Observable<ResponsePadraoDto<null> | null> {
    return this.editarFuncaoEventoPort.editarFuncaoEvento(request);
  }
}