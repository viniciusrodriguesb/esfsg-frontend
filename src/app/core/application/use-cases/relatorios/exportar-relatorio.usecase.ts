import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExportarRelatorioPort } from '../../../domain/ports/relatorios/exportar-relatorios.port';
import { ExportarRelatorioRequestDto } from '../../dto/request/exportar-relatorio-request.dto';

@Injectable({ providedIn: 'root' })
export class ExportarRelatoriosUseCase {
  constructor(private readonly exportarRelatorioPort: ExportarRelatorioPort) {}

  execute(request: ExportarRelatorioRequestDto): Observable<Blob | null> {
    return this.exportarRelatorioPort.exportarRelatorio(request);
  }
}
