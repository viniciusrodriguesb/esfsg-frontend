import { TipoUsuarioEnum } from '../../../domain/enums/tipo-usuario.enum';

export interface AlterarRoleUsuarioRequest {
  idUsuario: number;
  tipoUsuario: TipoUsuarioEnum;
}
