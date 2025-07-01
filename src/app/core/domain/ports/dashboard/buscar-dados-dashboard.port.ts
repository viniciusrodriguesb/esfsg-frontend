import { Observable } from "rxjs";
import { DadosDashboardResponseDto } from "../../../application/dto/response/dados-dashboard-response.dto";

export abstract class BuscarDadosDashboardPort {
  abstract buscarDadosDashboard(idEvento: number): Observable<DadosDashboardResponseDto | null>;
}