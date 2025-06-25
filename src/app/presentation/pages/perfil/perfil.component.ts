import { Component } from '@angular/core';
import { UsuarioResponseDto } from '../../../core/application/dto/response/usuario-response.dto';
import { ParametroStorageEnum } from '../../../core/domain/enums/parametro-storage.enum';
import { BuscarQrCodePagamentoUseCase } from '../../../core/application/use-cases/qrcode/buscar-qrcode-pagamento.usecase';
import { QrCodePagamentoResponseDto } from '../../../core/application/dto/response/qrcode-pagamento-response.dto';
import { InscricaoResponseDto } from '../../../core/application/dto/response/inscricao-response.dto';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  {

  usuarioExistente: UsuarioResponseDto;
  statusInscricao: InscricaoResponseDto;
  informacoesPagamento: QrCodePagamentoResponseDto;

  constructor(private readonly buscarQrCodePagamentoUsecase: BuscarQrCodePagamentoUseCase) {}

  ngOnInit(){
    this.statusInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.STATUS_INSCRICAO)) as InscricaoResponseDto;
    this.usuarioExistente = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)) as UsuarioResponseDto;
    this.buscarQrCodePagemento();
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

  public copiarPix(){
    
  }
}
