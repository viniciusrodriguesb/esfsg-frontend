import { Observable } from "rxjs";
import { FuncaoEventoResponse } from "../../../application/dto/response/funcoes-eventoresponse.dto";

export abstract class BuscarTodasFuncoesEventoPort {
  abstract buscarTodasFuncoesEvento(): Observable<FuncaoEventoResponse[] | null>;
}