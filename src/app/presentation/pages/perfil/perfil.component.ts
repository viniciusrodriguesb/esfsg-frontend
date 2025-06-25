import { Component } from '@angular/core';
import { UsuarioResponseDto } from '../../../core/application/dto/response/usuario-response.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { BuscarQrCodePagamentoUseCase } from '../../../core/application/use-cases/qrcode/buscar-qrcode-pagamento.usecase';
import { QrCodePagamentoResponseDto } from '../../../core/application/dto/response/qrcode-pagamento-response.dto';
import { InscricaoResponseDto } from '../../../core/application/dto/response/inscricao-response.dto';
import { BuscarInscricaoUseCase } from '../../../core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { InscricaoRequestDto } from '../../../core/application/dto/request/inscricao-request.dto';
import { StatusPagamentoInscricaoEnum } from '../../../core/domain/enums/status-pagamento-inscricao.enum';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {

  usuarioExistente: UsuarioResponseDto;
  statusInscricao: InscricaoResponseDto;
  inscricaoUsuario: InscricaoRequestDto;
  informacoesPagamento: QrCodePagamentoResponseDto;
  exibicaoCardPagamento: boolean = false;
  exibicaoCardCheckin: boolean = false;

  constructor(
    private readonly buscarQrCodePagamentoUsecase: BuscarQrCodePagamentoUseCase,
    private readonly buscarInscricaoUsecase: BuscarInscricaoUseCase) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
    this.usuarioExistente = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)) as UsuarioResponseDto;    

    if (JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) == undefined) {
      this.buscarInscricao();    
    }else{
      this.statusInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) as InscricaoResponseDto;
    }

    this.inicializarPagina();
  }

  public inicializarPagina(){    
    if(this.statusInscricao?.idStatus === StatusPagamentoInscricaoEnum.AGUARDANDO_PAGAMENTO) {
      this.exibicaoCardPagamento = true;
      this.buscarQrCodePagemento();
    }else{
      this.exibicaoCardPagamento = false;
    }
  }

  public buscarQrCodePagemento(){
    this.statusInscricao.idStatus = 6;

    this.buscarQrCodePagamentoUsecase.execute(this.statusInscricao.idStatus).subscribe({
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
