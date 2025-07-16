import { ExportarRelatorioRequestDto } from './../../../application/dto/request/exportar-relatorio-request.dto';
import { Observable } from "rxjs";

export abstract class ExportarRelatorioPort {
  abstract exportarRelatorio(request: ExportarRelatorioRequestDto): Observable<Blob | null>;
}