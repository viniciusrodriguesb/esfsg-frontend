import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoresHexMap } from '../../../../core/domain/enums/cores-visita.enum';
import { GestaoInscricaoResponse, InscricaoParaLiberacaoResponse } from '../../../../core/application/dto/response/inscricoes-response-dto';
import { TipoFuncionalidadeInscricao } from '../../../../core/domain/enums/tipo-funcionalidade-inscricao.enum';

@Component({
  selector: 'app-modal-info-inscricao',
  standalone: false,
  templateUrl: './modal-info-inscricao.component.html',
  styleUrl: './modal-info-inscricao.component.scss',
})
export class ModalInfoInscricaoComponent {
  pendente = TipoFuncionalidadeInscricao.PENDENTE;
  todas = TipoFuncionalidadeInscricao.TODAS;

  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dadosInscritoPendente: InscricaoParaLiberacaoResponse;
      dadosInscritoTodas: GestaoInscricaoResponse;
      tipoInscricao: TipoFuncionalidadeInscricao;
    }
  ) {}

  buscarCorHexa(cor: string): string {
    return CoresHexMap[cor];
  }

  fecharModal() {
    this.dialog.closeAll();
  }
}
