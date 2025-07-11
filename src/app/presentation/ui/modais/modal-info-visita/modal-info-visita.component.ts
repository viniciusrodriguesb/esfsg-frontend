import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscricaoParaLiberacaoResponse, GestaoInscricaoResponse } from '../../../../core/application/dto/response/inscricoes-response-dto';
import { CoresHexMap } from '../../../../core/domain/enums/cores-visita.enum';
import { TipoFuncionalidadeInscricao } from '../../../../core/domain/enums/tipo-funcionalidade-inscricao.enum';
import { InscritoVisitaResponseDto } from '../../../../core/application/dto/response/incritos-visita-response.dto';

@Component({
  selector: 'app-modal-info-visita',
  standalone: false,
  templateUrl: './modal-info-visita.component.html',
  styleUrl: './modal-info-visita.component.scss'
})
export class ModalInfoVisitaComponent {
  pendente = TipoFuncionalidadeInscricao.PENDENTE;
  todas = TipoFuncionalidadeInscricao.TODAS;

  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      infoInscritoAlocado: InscritoVisitaResponseDto;
    }
  ) {}

  buscarCorHexa(cor: string): string {
    return CoresHexMap[cor];
  }

  fecharModal() {
    this.dialog.closeAll();
  }
}

