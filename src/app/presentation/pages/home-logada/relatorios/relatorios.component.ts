import { ExportarRelatoriosUseCase } from './../../../../core/application/use-cases/relatorios/exportar-relatorio.usecase';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { EventoResponseDto } from '../../../../core/application/dto/response/evento-response.dto';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { NomePipe } from '../../../pipes/nome.pipe';
import { ExportarRelatorioRequestDto } from '../../../../core/application/dto/request/exportar-relatorio-request.dto';
import { TipoRelatorioEnum } from '../../../../core/domain/enums/tipo-relatorio.enum';
import { NotificacaoService } from '../../../../infrastructure/services/notificacao.service';

@Component({
  selector: 'app-relatorios',
  standalone: false,
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss',
})
export class RelatoriosComponent {
  private readonly _formBuilder = inject(FormBuilder);

  animacoes = [
    'animation-man.json',
    'animation-man-alt.json',
    'animation-woman.json',
  ];

  eventoSelecionado: EventoResponseDto;
  eventosSelect: TabelaDominioResponseDto[] = [];
  eventos: EventoResponseDto[] = [];
  habilitarBotao: boolean = false;
  options: AnimationOptions = {
    path: `/animations/${
      this.animacoes[Math.floor(Math.random() * this.animacoes.length)]
    }`,
    renderer: 'svg',
    loop: true,
  };

  formEvento = this._formBuilder.group({
    evento: ['', Validators.required],
  });

  constructor(
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly exportarRelatorioUsecase: ExportarRelatoriosUseCase,
    private readonly notificacaoService: NotificacaoService,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarEvento();
  }

  public selecionarEvento(evento: any) {
    this.eventoSelecionado = this.eventos.find((e) => e.id == evento);
    this.habilitarBotao = true;
  }

  public buscarEvento() {
    this.buscarEventoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.eventosSelect = resposta.map((evento) => ({
            id: evento.id,
            descricao: this.nomePipe.transform(evento.nome),
          }));
          this.eventos = resposta;
        }
      },
      error: (erro) => {
        this.habilitarBotao = false;
        this.notificacaoService.erro('Erro', 'Não foi possível buscar eventos.');
      },
    });
  }

  public baixarRelatorio() {
    const request: ExportarRelatorioRequestDto = {
      tipo: 1, //Todo: implementar seleção de tipo de arquivo
      idEvento: Number.parseInt(this.formEvento.get('evento')?.value),
    };

    this.exportarRelatorioUsecase.execute(request).subscribe((blob) => {
      if (!blob) {
        this.notificacaoService.erro('Erro', 'Falha ao gerar o relatório');
        return;
      }

      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      const nomeArquivo =
        request.tipo === TipoRelatorioEnum.PDF
          ? 'Inscricoes.pdf'
          : 'Inscricoes.xlsx';

      link.href = url;
      link.download = nomeArquivo;
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }
}
