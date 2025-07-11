import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { BuscarInscritosVisitaUseCase } from '../../../../../core/application/use-cases/visita/buscar-inscritos-visita.usecase';
import { InscritoVisitaResponseDto } from '../../../../../core/application/dto/response/incritos-visita-response.dto';
import { InscritoVisitaRequestDto } from '../../../../../core/application/dto/request/inscrito-visita-request.dto';
import { PageEvent } from '@angular/material/paginator';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { ParametroEmitter } from '../../../../../core/domain/enums/parametro-emitter.enum';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoVisitaComponent } from '../../../../ui/modais/modal-info-visita/modal-info-visita.component';
@Component({
  selector: 'app-visitas-alocadas',
  standalone: false,
  templateUrl: './visitas-alocadas.component.html',
  styleUrl: './visitas-alocadas.component.scss',
})
export class VisitasAlocadasComponent {
  @Input() public eventoId: number;
  @Input() public atualizacao: Subject<void>;

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  inscritosAlocadosVisita: PaginacaoResponse<InscritoVisitaResponseDto>;
  exibicaoListaInscritos: boolean = false;
  liberacaoBotaoAprovar: boolean = false;

  pageEvent: PageEvent;

  constructor(
    private readonly buscarInscritosVisitaUseCase: BuscarInscritosVisitaUseCase,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.atualizacao?.subscribe(() => {
      this.buscarVisitasAlocadas();
    });
  }

  ngOnChanges() {
    if (this.eventoId) {
      this.buscarVisitasAlocadas();
    }
  }

  public abrirModalInfoInscricao(inscrito: InscritoVisitaResponseDto) {
    const dialogRef = this.dialog.open(ModalInfoVisitaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        infoInscritoAlocado: inscrito,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  public buscarVisitasAlocadas(paginacao?: PageEvent) {
    let request: InscritoVisitaRequestDto = {
      idEvento: this.eventoId,
      alocado: true,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    this.buscarInscritosVisitaUseCase
      .execute(request)
      .subscribe((resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.inscritosAlocadosVisita = resultado;
          this.exibicaoListaInscritos = true;
        } else {
          this.exibicaoListaInscritos = false;
        }
      });

    return paginacao;
  }
}
