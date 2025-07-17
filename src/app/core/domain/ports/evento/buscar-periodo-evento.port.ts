import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarPeriodoEventoPort {
  abstract buscarPeriodoEvento(idEvento: number): Observable<TabelaDominioResponseDto[] | null>;
}