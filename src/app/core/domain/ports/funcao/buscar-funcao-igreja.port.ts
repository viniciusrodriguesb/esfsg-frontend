import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarFuncaoIgrejaPort {
  abstract buscarFuncaoIgreja(): Observable<TabelaDominioResponseDto[] | null>;
}