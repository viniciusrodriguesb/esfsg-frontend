import { ResponsePadraoDto } from '../../../application/dto/response/response-padrao.dto';
import { EditarFuncaoEventoRequest } from './../../../application/dto/request/editar-funcao-evento-request.dto';
import { Observable } from "rxjs";

export abstract class EditarFuncaoEventoPort {
  abstract editarFuncaoEvento(request: EditarFuncaoEventoRequest): Observable<ResponsePadraoDto<null> | null>;
}