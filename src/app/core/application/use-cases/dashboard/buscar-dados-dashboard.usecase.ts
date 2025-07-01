import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BuscarDadosDashboardPort } from "../../../domain/ports/dashboard/buscar-dados-dashboard.port";
import { DadosDashboardResponseDto } from "../../dto/response/dados-dashboard-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarDadosDashboardUseCase {
  constructor(private readonly buscarDadosDashboardPort: BuscarDadosDashboardPort) {}

  execute(idEvento: number): Observable<DadosDashboardResponseDto | null> {
    return this.buscarDadosDashboardPort.buscarDadosDashboard(idEvento);
  }
}