import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { GestaoInscricaoResponse } from '../../../../../core/application/dto/response/inscricoes-response-dto';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { GestaoInscricaoUseCase } from '../../../../../core/application/use-cases/gestao-inscricao/gestao-inscricao-usecase';
import { FiltroInscricaoRequest } from '../../../../../core/application/dto/request/inscricoes-pendentes-request.dto';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoInscricaoComponent } from '../../../../ui/modais/modal-info-inscricao/modal-info-inscricao.component';
import { TipoFuncionalidadeInscricao } from '../../../../../core/domain/enums/tipo-funcionalidade-inscricao.enum';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-obter-todas',
  standalone: false,
  templateUrl: './obter-todas.component.html',
  styleUrl: './obter-todas.component.scss',
})
export class ObterTodasComponent {
  @Input() public eventoId: number;

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  liberacaoBotaoAprovar: boolean = false;
  participantesSelecionados: any[] = [];
  exibicaoListaParticipantes: boolean = false;
  inscricoes: PaginacaoResponse<GestaoInscricaoResponse>;

  pageEvent: PageEvent;

  constructor(
    private readonly gestaoInscricaoUseCase: GestaoInscricaoUseCase,
    private readonly dialog: MatDialog
  ) {}

  ngOnChanges() {
    if (this.eventoId) {
      this.buscarInscricoes();
    }
  }

  public buscarInscricoes(paginacao?: PageEvent) {
    const inscricoesRequest: FiltroInscricaoRequest = {
      idEvento: this.eventoId,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 7,
    };    

    this.gestaoInscricaoUseCase.executeTodas(inscricoesRequest).subscribe({
      next: (resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.inscricoes = resultado;
      },
    });
    return paginacao;
  }

  public abrirModalInfoInscricao(inscrito: GestaoInscricaoResponse) {
    const dialogRef = this.dialog.open(ModalInfoInscricaoComponent, {
      width: '90%',
      height: 'auto',
      data: {
        dadosInscritoPendente: null,
        dadosInscritoTodas: inscrito,
        tipoInscricao: TipoFuncionalidadeInscricao.TODAS,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
