import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import moment from 'moment';
import { AnimationOptions } from 'ngx-lottie';
import Swal from 'sweetalert2';
import { CheckinRequestDto } from '../../../../core/application/dto/request/checkin-request.dto';
import { ItemCheckinDto } from '../../../../core/application/dto/response/checkin-response-response.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { StatusPagamentoInscricaoEnum } from '../../../../core/domain/enums/status-pagamento-inscricao.enum';
import { BuscarInscricoesPagamentoUseCase } from '../../../../core/application/use-cases/gestao-pagamento/buscar-inscricoes-pagamento.usecase';
import { PaginacaoResponse } from '../../../../core/application/dto/response/paginacao-response.dto';
import { GestaoPagamentoResponseDto } from '../../../../core/application/dto/response/gestao-pagamento-response.dto';
import { GestaoPagamentoRequestDto } from '../../../../core/application/dto/request/gestao-pagamento-request.dto';
import { ModalPagamentoConfirmadoComponent } from '../../../ui/modais/modal-pagamento-confirmado/modal-pagamento-confirmado.component';
import { ConfirmarPagamentoManualmenteUseCase } from '../../../../core/application/use-cases/gestao-pagamento/confirmar-pagamento-manualmente.usecase';
import { NotificacaoService } from '../../../../infrastructure/services/notificacao.service';
import { GerarNovoPixUseCase } from '../../../../core/application/use-cases/gestao-pagamento/gerar-novo-pix.usecase';

@Component({
  selector: 'app-gestao-pagamento',
  standalone: false,
  templateUrl: './gestao-pagamento.component.html',
  styleUrl: './gestao-pagamento.component.scss',
})
export class GestaoPagamentoComponent {
  private readonly _formBuilder = inject(FormBuilder);

  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  formPagamento = this._formBuilder.group({
    evento: [''],
    status: [StatusPagamentoInscricaoEnum.AGUARDANDO_PAGAMENTO],
    nome: [''],
  });

  statusPagamento: TabelaDominioResponseDto[] = [
    {
      id: StatusPagamentoInscricaoEnum.AGUARDANDO_PAGAMENTO,
      descricao: 'Em aguardo',
    },
    {
      id: StatusPagamentoInscricaoEnum.PAGAMENTO_CONFIRMADO,
      descricao: 'Confirmado',
    },
  ];

  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];

  inscricoes: PaginacaoResponse<GestaoPagamentoResponseDto>;
  exibicaoListaParticipantes: boolean = false;
  exibicaoCheckbox: boolean = true;
  inscricoesSelecionadas: GestaoPagamentoResponseDto[] = [];

  liberacaoBotaoValidar: boolean = false;
  liberacaoBotaoNovoPix: boolean = false;
  exibicaoBotaoRemover: boolean = false;

  pageEvent: PageEvent;

  eventosSelect: TabelaDominioResponseDto[] = [];
  exibirPesquisa: boolean = false;

  constructor(
    private readonly buscarInscricoesPagamentoUsecase: BuscarInscricoesPagamentoUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly confirmarPagamentoManualmenteUsecase: ConfirmarPagamentoManualmenteUseCase,
    private readonly gerarNovoPixUsecase: GerarNovoPixUseCase,
    private readonly notificacaoService: NotificacaoService,
    private readonly nomePipe: NomePipe,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarEvento();
  }

  private liberarBotaoNovoPix() {
    if (this.inscricoesSelecionadas.length > 1 || this.inscricoesSelecionadas.length == 0) {
      
      this.liberacaoBotaoNovoPix = false;
    } else {
      this.liberacaoBotaoNovoPix = true;
    }
  }

  private exibirCheckbox() {
    if (this.formPagamento.controls['status'].value == 3) {
      this.exibicaoCheckbox = true;
    } else {
      this.exibicaoCheckbox = false;
    }
  }
  public selecionarEvento(evento: any) {
    this.buscarInscricoesPagamento();
    this.exibirPesquisa = true;
  }

  public buscarEvento() {
    this.buscarEventoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.eventosSelect = resposta.map((evento) => ({
            id: evento.id,
            descricao: this.nomePipe.transform(evento.nome),
          }));
        }
      },
      error: (erro) => {
      },
    });
  }

  public gerarNovoPix() {
    this.gerarNovoPixUsecase.execute(this.inscricoesSelecionadas[0].idInscricao).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.notificacaoService.sucesso('Sucesso','Novo PIX gerado!');
        }
      },
      error: (erro) => {
        this.notificacaoService.erro('Atenção',erro.error.mensagem || 'Erro ao gerar novo PIX!');
      },
    });
  }

  public selecionarInscricao(inscricao: GestaoPagamentoResponseDto) {
    if (this.inscricoesSelecionadas.includes(inscricao)) {
      this.inscricoesSelecionadas.splice(
        this.inscricoesSelecionadas.indexOf(inscricao),
        1
      );
    } else {
      this.inscricoesSelecionadas.push(inscricao);
    }

    this.limitarQuantidadeInscricoesSelecionadas(this.inscricoesSelecionadas);
    this.liberarBotaoValidar();
    this.liberarBotaoNovoPix();
  }

  abrirModalConfirmacaoSucesso(
    resultadoAprovacao: GestaoPagamentoResponseDto[]
  ) {
    const dialogRef = this.dialog.open(ModalPagamentoConfirmadoComponent, {
      width: '90%',
      height: 'auto',
      data: {
        resultadoAprovacao: resultadoAprovacao,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.buscarInscricoesPagamento();
      this.limparVariaveis();
    });
  }

  public buscarInscricoesPagamento(paginacao?: PageEvent) {
    this.inscricoesSelecionadas = [];
    this.liberacaoBotaoValidar = false;
    this.liberacaoBotaoNovoPix = false;
    this.exibirCheckbox();

    const pagamentoRequest: GestaoPagamentoRequestDto = {
      idEvento: Number.parseInt(this.formPagamento.get('evento')?.value),
      nome: this.formPagamento.get('nome')?.value,
      status: this.formPagamento.get('status')?.value,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    this.buscarInscricoesPagamentoUsecase.execute(pagamentoRequest).subscribe({
      next: (resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.inscricoes = resultado;
      },
      error: (error) => {
        this.exibicaoListaParticipantes = false;
      },
    });
    return paginacao;
  }

  private limitarQuantidadeInscricoesSelecionadas(
    inscricoesSelecionadas: GestaoPagamentoResponseDto[]
  ) {
    if (inscricoesSelecionadas.length > 6) {
      this.abrirModalLimiteParticipantes();
    }
  }

  private liberarBotaoValidar() {
    if (this.inscricoesSelecionadas.length > 0) {
      this.liberacaoBotaoValidar = true;
    } else {
      this.liberacaoBotaoValidar = false;
    }
  }

  private abrirModalLimiteParticipantes() {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: 'Não é possivel selecionar mais de 6 participantes.',
      confirmButtonText: 'Entendi',
      customClass: {
        title: 'swal-title',
        confirmButton: 'swal-confirm-btn',
        popup: 'swal-popup',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscricoesSelecionadas = this.inscricoesSelecionadas.slice(0, 6);
      }
    });
  }

  public confirmarPagamentoManualmente() {
    this.confirmarPagamentoManualmenteUsecase
      .execute(this.inscricoesSelecionadas.map((inscricao) => inscricao.idInscricao))
      .subscribe({
        next: (resultado) => {
          this.abrirModalConfirmacaoSucesso(this.inscricoesSelecionadas);
        },
        error: (error) => {
          this.notificacaoService.erro('Atenção', 'Erro ao confirmar pagamento manualmente!');
        },
      });
  }

  private limparVariaveis() {
    this.inscricoesSelecionadas = [];
    this.liberacaoBotaoValidar = false;
    this.exibicaoBotaoRemover = false;
  }
}
