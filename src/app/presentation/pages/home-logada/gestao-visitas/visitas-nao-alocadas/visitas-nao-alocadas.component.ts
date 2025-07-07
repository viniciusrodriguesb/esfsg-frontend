import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { BuscarInscritosVisitaUseCase } from '../../../../../core/application/use-cases/visita/buscar-inscritos-visita.usecase';
import { InscritoVisitaRequestDto } from '../../../../../core/application/dto/request/inscrito-visita-request.dto';
import { InscritoVisitaResponseDto } from '../../../../../core/application/dto/response/incritos-visita-response.dto';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { PageEvent } from '@angular/material/paginator';

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

  pageEvent: PageEvent;

  constructor(
    private readonly buscarInscritosVisitaUseCase: BuscarInscritosVisitaUseCase
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

  alocarInscritos() {
    // Implementar lógica para alocar inscritos selecionados
    console.log('Alocar inscritos selecionados');
  }
}
