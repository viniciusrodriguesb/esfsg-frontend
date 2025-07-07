import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { AnimationOptions } from 'ngx-lottie';
import { BuscarParticipantesCheckinUseCase } from '../../../../core/application/use-cases/checkin/buscar-participantes-checkin.usecase';
import { CheckinRequestDto } from '../../../../core/application/dto/request/checkin-request.dto';
import {
  CheckinResponseDto,
  ItemCheckinDto,
} from '../../../../core/application/dto/response/checkin-response-response.dto';

import { MatDialog } from '@angular/material/dialog';
import { ModalQrcodeCheckinComponent } from '../../../ui/modais/modal-qrcode-checkin/modal-qrcode-checkin.component';
import { ModalCheckinConfirmadoComponent } from '../../../ui/modais/modal-checkin-confirmado/modal-checkin-confirmado.component';
import { ValidarQrCodeParticipanteUseCase } from '../../../../core/application/use-cases/checkin/validar-qrcode-participante.usecase';
import Swal from 'sweetalert2';
import moment from 'moment';
import {
  DadoParticipanteDto,
  ValidacaoQrCodeParticipanteResponseDto,
} from '../../../../core/application/dto/response/validacao-checkin-response.dto';
import { find } from 'rxjs/internal/operators/find';
import { ModalParticipanteHorarioErradoComponent } from '../../../ui/modais/modal-participante-horario-errado/modal-participante-horario-errado.component';
import { PaginacaoResponse } from '../../../../core/application/dto/response/paginacao-response.dto';
import { PageEvent } from '@angular/material/paginator';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';

@Component({
  selector: 'app-check-in',
  standalone: false,
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
})
export class CheckInComponent {
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

  formCheckin = this._formBuilder.group({
    funcaoEvento: [''],
    periodo: [''],
    status: [''],
    nome: [''],
    evento: [''],
  });

  statusCheckin: TabelaDominioResponseDto[] = [
    { id: 0, descricao: 'Selecione' },
    { id: 1, descricao: 'Presente' },
    { id: 2, descricao: 'Ausente' },
  ];

  periodos: TabelaDominioResponseDto[] = [
    { id: 0, descricao: 'Selecione' },
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];

  checkin: CheckinResponseDto;
  exibicaoListaParticipantes: boolean = false;
  participantesSelecionados: ItemCheckinDto[] = [];

  liberacaoBotaoValidar: boolean = false;
  exibicaoBotaoRemover: boolean = false;

  listaParticipantesPeriodoErrado: ItemCheckinDto[] = [];

  horarioAtual = moment();
  horarioMinimoTarde = moment(
    this.horarioAtual.format('YYYY-MM-DD') + ' 23:00',
    'YYYY-MM-DD HH:mm'
  );
  pageEvent: PageEvent;

  eventosSelect: TabelaDominioResponseDto[] = [];
  exibirPesquisa: boolean = false;

  constructor(
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly buscarParticipantesCheckinUsecase: BuscarParticipantesCheckinUseCase,
    private readonly validarQrCodeParticipanteUseCase: ValidarQrCodeParticipanteUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly nomePipe: NomePipe,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarFuncaoEvento();
    this.buscarEvento();
  }

  public selecionarEvento(evento: any) {
    this.buscarParticipantesCheckin();
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
        console.error('Erro ao buscar eventos:', erro);
      },
    });
  }

  public selecionarParticipante(participante: ItemCheckinDto) {
    // TODO: Colocar validaçao para não permitir selecionar participantes com status "Presente" e "Ausente" ao mesmo tempo antes de incluir na lista
    if (this.participantesSelecionados.includes(participante)) {
      this.participantesSelecionados.splice(
        this.participantesSelecionados.indexOf(participante),
        1
      );
    } else {
      this.participantesSelecionados.push(participante);
    }

    this.limitarQuantidadeParticipantesSelecionados(
      this.participantesSelecionados
    );
    this.liberarBotaoValidar();
    this.impedirSelecaoParticipanteAusentePresente();
    this.verificarParticipantePeriodoErrado();
    this.escolherEntreValidacaoRemocaoParticipante();
  }

  public buscarParticipantesCheckin(paginacao?: PageEvent) {
    this.participantesSelecionados = [];
    this.listaParticipantesPeriodoErrado = [];
    this.liberacaoBotaoValidar = false;

    const checkinRequest: CheckinRequestDto = {
      idEvento: Number.parseInt(this.formCheckin.get('evento')?.value),
      nome: this.formCheckin.get('nome')?.value,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    if (Number.parseInt(this.formCheckin.get('status')?.value) == 1) {
      checkinRequest.validado = true;
    } else if (Number.parseInt(this.formCheckin.get('status')?.value) == 2) {
      checkinRequest.validado = false;
    }

    if (
      this.formCheckin.get('funcaoEvento')?.value &&
      Number.parseInt(this.formCheckin.get('funcaoEvento')?.value) != 0
    ) {
      checkinRequest.funcaoEvento = [
        Number.parseInt(this.formCheckin.get('funcaoEvento')?.value),
      ];
    } else {
      checkinRequest.funcaoEvento = null;
    }

    if (Number.parseInt(this.formCheckin.get('periodo')?.value) == 1) {
      checkinRequest.periodo = PeriodoEnum.Tarde;
    } else if (Number.parseInt(this.formCheckin.get('periodo')?.value) == 2) {
      checkinRequest.periodo = PeriodoEnum.Integral;
    } else {
      checkinRequest.periodo = null;
    }

    this.buscarParticipantesCheckinUsecase.execute(checkinRequest).subscribe({
      next: (resultado) => {
        console.log('Resultado da busca de participantes:', resultado);
        
        if (resultado != null && resultado.itens.length > 0) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.checkin = resultado;
      },
      error: (error) => {
        this.exibicaoListaParticipantes = false;
      },
    });
    return paginacao;
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(1).subscribe({
      next: (resultado) => {
        const funcoesFormatadas = this.formatarNomes(resultado);
        this.opcoesFuncaoEvento = [
          { id: 0, descricao: 'Selecione' },
          ...funcoesFormatadas,
        ];
      },
      error: () => {},
    });
  }

  public validarCheckin() {
    this.validarQrCodeParticipante(this.participantesSelecionados);
  }

  abrirModalConfirmacaoSucesso(resultadoValidacao: DadoParticipanteDto[]) {
    const dialogRef = this.dialog.open(ModalCheckinConfirmadoComponent, {
      width: '90%',
      height: 'auto',
      data: {
        resultadoValidacao: resultadoValidacao,
        remocaoCheckin: this.escolherEntreValidacaoRemocaoParticipante(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.buscarParticipantesCheckin();
      this.limparVariaveis();
    });
  }

  abrirScanner() {
    const dialogRef = this.dialog.open(ModalQrcodeCheckinComponent, {
      width: '90%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.buscarParticipantesCheckin();
      this.limparVariaveis();
    });
  }

  private validarQrCodeParticipante(
    participantesSelecionados: ItemCheckinDto[]
  ) {
    const request = {
      ids: participantesSelecionados.map(
        (participante) => participante.idCheckin
      ),
      presenca: !this.escolherEntreValidacaoRemocaoParticipante(),
    };

    this.validarQrCodeParticipanteUseCase.execute(request).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.abrirModalConfirmacaoSucesso(response.dados);
        }
      },
      error: (error) => {
        console.error('Erro ao validar QR Code:', error);
      },
    });
  }

  private escolherEntreValidacaoRemocaoParticipante(): boolean {
    if (
      this.participantesSelecionados.length > 0 &&
      this.participantesSelecionados.every(
        (participante) => participante.presenca
      )
    ) {
      this.exibicaoBotaoRemover = true;
    } else {
      this.exibicaoBotaoRemover = false;
    }
    return this.participantesSelecionados.every(
      (participante) => participante.presenca
    );
  }

  private limitarQuantidadeParticipantesSelecionados(
    participantesSelecionados: ItemCheckinDto[]
  ) {
    if (participantesSelecionados.length > 6) {
      this.abrirModalLimiteParticipantes();
    }
  }

  private impedirSelecaoParticipanteAusentePresente() {
    if (
      this.participantesSelecionados.find(
        (participante) => participante.presenca
      ) &&
      this.participantesSelecionados.find(
        (participante) => !participante.presenca
      )
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Não é possível selecionar participantes com status "Presente" e "Ausente" ao mesmo tempo.',
        confirmButtonText: 'Entendi',
        customClass: {
          title: 'swal-title',
          confirmButton: 'swal-confirm-btn',
          popup: 'swal-popup',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.participantesSelecionados.pop();
          this.escolherEntreValidacaoRemocaoParticipante();
          // TODO: Implementar lógica para evitar a troca de cor do botao quando a pessoa selecionar um participante ausente e presente
        }
      });
    }
  }

  private liberarBotaoValidar() {
    if (this.participantesSelecionados.length > 0) {
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
        this.participantesSelecionados = this.participantesSelecionados.slice(
          0,
          6
        );
      }
    });
  }

  private verificarParticipantePeriodoErrado() {
    this.listaParticipantesPeriodoErrado = [];

    this.participantesSelecionados.forEach((participante) => {
      if (
        participante.evento.periodo == PeriodoEnum.Tarde &&
        this.horarioAtual.isBefore(this.horarioMinimoTarde)
      ) {
        if (!this.listaParticipantesPeriodoErrado.includes(participante)) {
          this.listaParticipantesPeriodoErrado.push(participante);
        }
      }
    });
  }

  public abrirModalParticipanteHorarioErrado() {
    const dialogRef = this.dialog.open(
      ModalParticipanteHorarioErradoComponent,
      {
        width: '90%',
        height: 'auto',
        data: {
          resultadoValidacao: this.listaParticipantesPeriodoErrado,
          horarioMinimo: this.horarioMinimoTarde.format('HH:mm'),
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {});
  }

  private limparVariaveis() {
    this.participantesSelecionados = [];
    this.liberacaoBotaoValidar = false;
    this.listaParticipantesPeriodoErrado = [];
    this.exibicaoBotaoRemover = false;
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }
}
