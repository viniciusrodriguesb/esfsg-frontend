import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarClassePort {
  abstract buscarClasses(): Observable<TabelaDominioResponseDto[] | null>;
}
