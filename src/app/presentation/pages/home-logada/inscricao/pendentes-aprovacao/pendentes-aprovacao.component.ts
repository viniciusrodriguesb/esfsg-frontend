import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { InscricoesPendentesRequestDto } from '../../../../../core/application/dto/request/inscricoes-pendentes-request.dto';
import { DadosUsuarioAdminResponseDto } from '../../../../../core/application/dto/response/usuario-admin.dto';
import { ParametroStorageEnum } from '../../../../../core/domain/enums/parametro-storage.enum';
import { InscricaoParaLiberacaoResponse } from '../../../../../core/application/dto/response/inscricoes-response-dto';
import { GestaoInscricaoUseCase } from '../../../../../core/application/use-cases/gestao-inscricao/gestao-inscricao-usecase';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoInscricaoComponent } from '../../../../ui/modais/modal-info-inscricao/modal-info-inscricao.component';
import { TipoFuncionalidadeInscricao } from '../../../../../core/domain/enums/tipo-funcionalidade-inscricao.enum';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pendentes-aprovacao',
  standalone: false,
  templateUrl: './pendentes-aprovacao.component.html',
  styleUrl: './pendentes-aprovacao.component.scss',
})
export class PendentesAprovacaoComponent {

  @Input() public eventoId: number;

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

  pageEvent: PageEvent;

  constructor(
    private readonly gestaoInscricaoUseCase: GestaoInscricaoUseCase,
    private readonly dialog: MatDialog
  ) {}

  ngOnChanges() {
    if (this.eventoId) {
      this.buscarInscricoesPendentes();
    }
  }

  ngOnInit() {
    this.usuarioLogado = JSON.parse( localStorage.getItem(ParametroStorageEnum.USUARIO_LOGADO));
  }

  public buscarInscricoesPendentes(paginacao?: PageEvent) {
    this.participantesSelecionados = [];
    this.liberacaoBotaoAprovar = false;
    
    const inscricoesPendentesRequest: InscricoesPendentesRequestDto = {
      cpfLogado: this.usuarioLogado.cpf,
      idEvento: this.eventoId,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    this.gestaoInscricaoUseCase
      .executePendentes(inscricoesPendentesRequest)
      .subscribe({
        next: (resultado) => {
          if (resultado != null && resultado.itens.length > 0) {
            this.exibicaoListaParticipantes = true;
          } else {
            this.exibicaoListaParticipantes = false;
          }

          this.inscricoesPendentes = resultado;
        },
      });
      return paginacao;
  }

  public inserirInscricoesSelecionadas(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.participantesSelecionados.push(id);
    } else {
      this.participantesSelecionados = this.participantesSelecionados.filter(
        (item) => item !== id
      );
    }

    this.liberarBotaoAprovar();
  }

  public aprovarInscricao() {
    let ids = this.participantesSelecionados;

    if (!ids || ids.length === 0) {
      alert('Selecione pelo menos uma inscrição para aprovar.');
      return;
    }

    this.gestaoInscricaoUseCase.executarAprovacao(ids).subscribe({
      next: () => {
        this.participantesSelecionados = [];
        this.liberacaoBotaoAprovar = false;
        this.buscarInscricoesPendentes();
      },
      error: (err) => {
        console.error('Erro ao aprovar inscrições:', err);
      },
    });
  }

  public abrirModalInfoInscricao(inscrito: InscricaoParaLiberacaoResponse) {
       const dialogRef = this.dialog.open(ModalInfoInscricaoComponent, {
         width: '90%',
         height: 'auto',
         data: {
           dadosInscritoPendente: inscrito,
           dadosInscritoTodas: null,
           tipoInscricao: TipoFuncionalidadeInscricao.PENDENTE,
         },
       });
   
       dialogRef.afterClosed().subscribe((result) => {
         console.log('Modal fechado com resultado:', result);
         
       });
  }

  private liberarBotaoAprovar() {
    if (this.participantesSelecionados.length > 0) {
      this.liberacaoBotaoAprovar = true;
    } else {
      this.liberacaoBotaoAprovar = false;
    }
  }
}
