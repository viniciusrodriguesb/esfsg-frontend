import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../../infrastructure/adapter/dto/response/tabela-dominio-response.dto";

export abstract class BuscarIgrejaPort {
  abstract buscarIgreja(): Observable<TabelaDominioResponseDto[] | null>;
}