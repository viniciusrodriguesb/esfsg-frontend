import { Observable } from 'rxjs';
import { PaginacaoResponse } from '../../../application/dto/response/paginacao-response.dto';
import { BuscarUsuariosRequest } from '../../../application/dto/request/buscar-usuarios-request.dto';
import { BuscarUsuarioResponseDto } from '../../../application/dto/response/buscar-usuarios-response.dto';

export abstract class BuscarUsuariosPort {
  abstract buscarUsuarios(request: BuscarUsuariosRequest): Observable<PaginacaoResponse<BuscarUsuarioResponseDto>>;
}
