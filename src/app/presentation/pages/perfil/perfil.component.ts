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

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {
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

  constructor(
    private readonly buscarQrCodePagamentoUsecase: BuscarQrCodePagamentoUseCase,
    private readonly buscarQrCodeCheckinUsecase: BuscarQrCodeCheckinUseCase,
    private readonly buscarInscricaoUsecase: BuscarInscricaoUseCase) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
    this.usuarioExistente = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)) as UsuarioResponseDto;    

    if (JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) == undefined) {
      this.buscarInscricao(); 
      this.buscarQrCodeCheckin();   
    }else{
      this.statusInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) as InscricaoResponseDto;
    }

    this.inicializarPagina();
  }

  public inicializarPagina(){    
    if(this.statusInscricao?.idStatus === StatusPagamentoInscricaoEnum.AGUARDANDO_PAGAMENTO) {
      this.exibicaoCardPagamento = true;
      this.buscarQrCodePagamento();
    }else if(this.statusInscricao?.idStatus === StatusPagamentoInscricaoEnum.PAGAMENTO_CONFIRMADO){
      this.exibicaoBotaoCheckin = true;
      this.buscarQrCodeCheckin();
    }else{
      this.exibicaoBotaoCheckin = false;
      this.exibicaoCardPagamento = false;
    }

  }

  public exibirCardCheckin(){
    this.exibicaoCardCheckin = !this.exibicaoCardCheckin;
  }

  public buscarQrCodeCheckin(){
    this.buscarQrCodeCheckinUsecase.execute(this.statusInscricao.id).subscribe({
      next: (resposta) => {
        this.informacoesCheckin = resposta;
      },
      error: (err) => {
        console.error('Erro ao buscar QR Code de check-in:', err);
      }
    });
  }

  public buscarQrCodePagamento(){

    this.buscarQrCodePagamentoUsecase.execute(this.statusInscricao.id).subscribe({
      next: (resposta) => {
        this.informacoesPagamento = resposta;
      },
      error: (err) => {
        console.error('Erro ao buscar QR Code de pagamento:', err);
      }
    });
  }

    public buscarInscricao() {
    this.buscarInscricaoUsecase.execute(this.inscricaoUsuario.idEvento, this.usuarioExistente.id).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.statusInscricao = resposta;
          localStorage.setItem(ParametroStorageEnum.STATUS_INSCRICAO, JSON.stringify(this.statusInscricao));
        }
      },
      error: (erro) => {
      },
    });
  }

  public copiarPix(){
    
  }
}
