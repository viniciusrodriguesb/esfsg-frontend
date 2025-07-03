import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { InscricoesPendentesRequestDto } from '../../../../../core/application/dto/request/inscricoes-pendentes-request.dto';
import { DadosUsuarioAdminResponseDto } from '../../../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../../../core/domain/enums/parametro-storage.enum';
import { InscricaoParaLiberacaoResponse } from '../../../../../core/application/dto/response/inscricoes-response-dto';
import { GestaoInscricaoUseCase } from '../../../../../core/application/use-cases/gestao-inscricao/gestao-inscricao-usecase';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';

@Component({
  selector: 'app-pendentes-aprovacao',
  standalone: false,
  templateUrl: './pendentes-aprovacao.component.html',
  styleUrl: './pendentes-aprovacao.component.scss',
})
export class PendentesAprovacaoComponent {
  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  liberacaoBotaoAprovar: boolean = false;
  participantesSelecionados: any[] = [];
  exibicaoListaParticipantes: boolean = false;
  inscricoesPendentes: PaginacaoResponse<InscricaoParaLiberacaoResponse>;
  usuarioLogado: DadosUsuarioAdminResponseDto;

  constructor(private readonly gestaoInscricaoUseCase: GestaoInscricaoUseCase){}

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO));
    this.buscarInscricoesPendentes();
  }

  public buscarInscricoesPendentes() {
    const inscricoesPendentesRequest: InscricoesPendentesRequestDto = {
      cpf: this.usuarioLogado.cpf,
      pagina: 1,
      tamanhoPagina: 20,
    };

    this.gestaoInscricaoUseCase.executePendentes(inscricoesPendentesRequest).subscribe({
      next: (resultado) => {
         if (resultado != null) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.inscricoesPendentes = resultado;
      }
    });
  }

  public aprovarInscricao() {
    console.log('Inscrição aprovada!');
  }
  private liberarBotaoAprovar() {
    if (this.participantesSelecionados.length > 0) {
      this.liberacaoBotaoAprovar = true;
    } else {
      this.liberacaoBotaoAprovar = false;
    }
  }
}
