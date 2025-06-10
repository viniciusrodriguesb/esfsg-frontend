import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarFuncaoEventoPort {
  abstract buscarFuncaoEvento(idEvento: number): Observable<TabelaDominioResponseDto[] | null>;
}