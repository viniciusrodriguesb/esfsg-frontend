import { Observable } from 'rxjs';
import { ResponsePadraoDto } from '../../../application/dto/response/response-padrao.dto';
import { AlterarSenhaUsuarioRequest } from '../../../application/dto/request/alterar-senha-usuario-request.dto';

export abstract class AlterarSenhaUsuarioPort {
  abstract alterarSenha(request: AlterarSenhaUsuarioRequest): Observable<ResponsePadraoDto<null>>;
}
