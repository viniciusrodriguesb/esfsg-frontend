import { AlterarRoleUsuarioRequest } from './../../../application/dto/request/alterar-role-usuario-request.dto';
import { Observable } from 'rxjs';
import { ResponsePadraoDto } from '../../../application/dto/response/response-padrao.dto';

export abstract class AlterarRoleUsuarioPort {
  abstract alterarRole(request: AlterarRoleUsuarioRequest): Observable<ResponsePadraoDto<null>>;
}
