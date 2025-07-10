import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { BuscarInscritosVisitaUseCase } from '../../../../../core/application/use-cases/visita/buscar-inscritos-visita.usecase';
import { InscritoVisitaRequestDto } from '../../../../../core/application/dto/request/inscrito-visita-request.dto';
import { InscritoVisitaResponseDto } from '../../../../../core/application/dto/response/incritos-visita-response.dto';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ModalAlocacaoVisitaComponent } from '../../../../ui/modais/modal-alocacao-visita/modal-alocacao-visita.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visitas-nao-alocadas',
  standalone: false,
  templateUrl: './visitas-nao-alocadas.component.html',
  styleUrl: './visitas-nao-alocadas.component.scss',
})
export class VisitasNaoAlocadasComponent {
  @Input() public eventoId: number;

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  inscritosNaoAlocadosVisita: PaginacaoResponse<InscritoVisitaResponseDto>;
  exibicaoListaInscritos: boolean = false;
  liberacaoBotaoAprovar: boolean = false;
  inscritosSelecionados: InscritoVisitaResponseDto[] = [];

  pageEvent: PageEvent;

  constructor(
    private readonly buscarInscritosVisitaUseCase: BuscarInscritosVisitaUseCase,
    private readonly dialog: MatDialog
  ) {}

  ngOnChanges() {
    if (this.eventoId) {
      this.buscarVisitasNaoAlocadas();
    }
  }

  public buscarVisitasNaoAlocadas(paginacao?: PageEvent) {
    let request: InscritoVisitaRequestDto = {
      idEvento: this.eventoId,
      alocado: false,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    this.buscarInscritosVisitaUseCase
      .execute(request)
      .subscribe((resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.inscritosNaoAlocadosVisita = resultado;
          this.exibicaoListaInscritos = true;
        } else {
          this.exibicaoListaInscritos = false;
        }
      });

    return paginacao;
  }

  public abrirModalAlocacao() {
    const dialogRef = this.dialog.open(ModalAlocacaoVisitaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        dadosVisita: this.inscritosSelecionados
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal fechado com resultado:', result);
    });
  }

  public selecionarInscrito(inscrito: InscritoVisitaResponseDto) {
    if (this.inscritosSelecionados.includes(inscrito)) {
      this.inscritosSelecionados.splice(
        this.inscritosSelecionados.indexOf(inscrito),
        1
      );
    } else {
      this.inscritosSelecionados.push(inscrito);
    }

    this.limitarQuantidadeInscritosSelecionados(this.inscritosSelecionados);
    this.liberarBotaoAprovar();
  }

  private limitarQuantidadeInscritosSelecionados(
    inscritosSelecionados: InscritoVisitaResponseDto[]
  ) {
    if (inscritosSelecionados.length > 6) {
      this.abrirModalLimiteInscritos();
    }
  }

  private liberarBotaoAprovar() {
    if (this.inscritosSelecionados.length > 0) {
      this.liberacaoBotaoAprovar = true;
    } else {
      this.liberacaoBotaoAprovar = false;
    }
  }

  private abrirModalLimiteInscritos() {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: 'Não é possivel selecionar mais de 6 inscritos.',
      confirmButtonText: 'Entendi',
      customClass: {
        title: 'swal-title',
        confirmButton: 'swal-confirm-btn',
        popup: 'swal-popup',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscritosSelecionados = this.inscritosSelecionados.slice(0, 6);
      }
    });
  }

  alocarInscritos() {
    if (this.inscritosSelecionados.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Selecione pelo menos um inscrito para alocar.',
        confirmButtonText: 'Entendi',
        customClass: {
          title: 'swal-title',
          confirmButton: 'swal-confirm-btn',
          popup: 'swal-popup',
        },
        buttonsStyling: false,
      });
      return;
    }

    // Lógica para alocar os inscritos selecionados
  }
}
