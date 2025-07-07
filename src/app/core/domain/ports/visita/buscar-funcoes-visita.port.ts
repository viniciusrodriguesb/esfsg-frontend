import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarFuncoesVisitaPort {
  abstract buscarFuncoesVisita(): Observable<TabelaDominioResponseDto[] | null>;
}