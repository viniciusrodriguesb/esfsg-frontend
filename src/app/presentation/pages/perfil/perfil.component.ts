import { Component } from '@angular/core';
import { UsuarioResponseDto } from '../../../core/application/dto/response/usuario-response.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { BuscarQrCodePagamentoUseCase } from '../../../core/application/use-cases/qrcode/buscar-qrcode-pagamento.usecase';
import { QrCodePagamentoResponseDto } from '../../../core/application/dto/response/qrcode-pagamento-response.dto';
import { InscricaoResponseDto } from '../../../core/application/dto/response/inscricao-response.dto';
import { BuscarInscricaoUseCase } from '../../../core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { InscricaoRequestDto } from '../../../core/application/dto/request/inscricao-request.dto';
import { StatusPagamentoInscricaoEnum } from '../../../core/domain/enums/status-pagamento-inscricao.enum';
import { AnimationOptions } from 'ngx-lottie';
import { QrCodeCheckinResponseDto } from '../../../core/application/dto/response/qrcode-checkin-response.dto';
import { BuscarQrCodeCheckinUseCase } from '../../../core/application/use-cases/qrcode/buscar-qrcode-checkin.usecase';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalEdicaoUsuarioComponent } from '../../ui/modais/modal-edicao-usuario/modal-edicao-usuario.component';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  options: AnimationOptions = {
    path: '/animations/animation-perfil.json',
    renderer: 'svg',
    loop: false,
  };

  usuarioExistente: UsuarioResponseDto;
  statusInscricao: InscricaoResponseDto;
  inscricaoUsuario: InscricaoRequestDto;
  informacoesPagamento: QrCodePagamentoResponseDto;
  informacoesCheckin: QrCodeCheckinResponseDto;
  exibicaoCardPagamento: boolean = false;
  exibicaoCardCheckin: boolean = false;
  exibicaoBotaoCheckin: boolean = false;
  exibicaoAlertaInstrumentista: boolean = false;
  dadosEvento: any;

  constructor(
    private readonly dialog: MatDialog,
    private readonly buscarQrCodePagamentoUsecase: BuscarQrCodePagamentoUseCase,
    private readonly buscarQrCodeCheckinUsecase: BuscarQrCodeCheckinUseCase,
    private readonly buscarInscricaoUsecase: BuscarInscricaoUseCase
  ) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)
    ) as InscricaoRequestDto;
    this.usuarioExistente = JSON.parse(
      localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)
    ) as UsuarioResponseDto;

    this.dadosEvento = JSON.parse(localStorage.getItem(ParametroStorageEnum.EVENTO));

    if (
      JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) ==
      undefined
    ) {
      this.buscarInscricao();
      this.buscarQrCodeCheckin();
    } else {
      this.statusInscricao = JSON.parse(
        localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)
      ) as InscricaoResponseDto;
    }

    this.inicializarPagina();
    this.exibirAlertaInstrumentista();
  }

  public exibirAlertaInstrumentista(){
    if(this.inscricaoUsuario.idFuncaoEvento == 4){
      this.exibicaoAlertaInstrumentista = true;
    }else{
      this.exibicaoAlertaInstrumentista = false;
    }
  }

  public inicializarPagina() {
    if (
      this.statusInscricao?.idStatus ===
      StatusPagamentoInscricaoEnum.AGUARDANDO_PAGAMENTO
    ) {
      this.buscarQrCodePagamento();
    } else if (
      this.statusInscricao?.idStatus ===
      StatusPagamentoInscricaoEnum.PAGAMENTO_CONFIRMADO
    ) {
      this.exibicaoBotaoCheckin = true;
      this.buscarQrCodeCheckin();
    } else {
      this.exibicaoBotaoCheckin = false;
      this.exibicaoCardPagamento = false;
    }
  }

  public exibirCardCheckin() {
    this.exibicaoCardCheckin = !this.exibicaoCardCheckin;
  }

  public buscarQrCodeCheckin() {
    this.buscarQrCodeCheckinUsecase.execute(this.statusInscricao.id).subscribe({
      next: (resposta) => {
        this.informacoesCheckin = resposta;
      },
      error: (err) => {
        console.error('Erro ao buscar QR Code de check-in:', err);
      },
    });
  }

  public buscarQrCodePagamento() {
    this.buscarQrCodePagamentoUsecase
      .execute(this.statusInscricao.id)
      .subscribe({
        next: (resposta) => {
          if (resposta) {
            this.informacoesPagamento = resposta;
            this.exibicaoCardPagamento = true;
          } else {
            this.exibicaoCardPagamento = false;
          }
        },
        error: (err) => {
          this.exibicaoCardPagamento = false;
          console.error('Erro ao buscar QR Code de pagamento:', err);
        },
      });
  }

  public buscarInscricao() {
    this.buscarInscricaoUsecase
      .execute(this.inscricaoUsuario.idEvento, this.usuarioExistente.id)
      .subscribe({
        next: (resposta) => {
          if (resposta) {
            this.statusInscricao = resposta;
            localStorage.setItem(
              ParametroStorageEnum.STATUS_INSCRICAO,
              JSON.stringify(this.statusInscricao)
            );
          }
        },
        error: (erro) => {},
      });
  }

  public copiarPix() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        navigator.clipboard.writeText(this.informacoesPagamento.pixCopiaCola);
      } catch (error) {
        console.error('Falha ao copiar o texto:', error);
      }
    } else {
      console.warn('A API Clipboard não é suportada neste navegador.');
    }
  }

  public navegarParaGrupo() {
    if (this.dadosEvento) {
      window.location.href = this.dadosEvento;
    }
  }

    abrirModalEdicaoUsuario() {
      const dialogRef = this.dialog.open(ModalEdicaoUsuarioComponent, {
        width: '90%',
        height: 'auto',
        data: {
          dadosUsuario: this.usuarioExistente
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {

      });
    }
}
