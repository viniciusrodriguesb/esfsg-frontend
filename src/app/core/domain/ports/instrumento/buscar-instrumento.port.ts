import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../../application/dto/response/tabela-dominio-response.dto";

export abstract class BuscarInstrumentoPort {
  abstract buscarInstrumentos(): Observable<TabelaDominioResponseDto[] | null>;
}