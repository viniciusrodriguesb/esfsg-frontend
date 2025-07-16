import { TipoRelatorioEnum } from '../../../domain/enums/tipo-relatorio.enum';

export class ExportarRelatorioRequestDto {
  tipo: TipoRelatorioEnum;
  idEvento: number;
}
