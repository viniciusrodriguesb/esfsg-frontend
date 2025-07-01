import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { BuscarRegiaoUseCase } from '../../../../core/application/use-cases/regiao/buscar-regiao.usecase';
import { EventoResponseDto } from '../../../../core/application/dto/response/evento-response.dto';
import { NomePipe } from '../../../pipes/nome.pipe';
import { BuscarDadosDashboardUseCase } from '../../../../core/application/use-cases/dashboard/buscar-dados-dashboard.usecase';
import { BuscarProximoEventoUseCase } from '../../../../core/application/use-cases/dashboard/buscar-proximo-evento.usecase';
import { ProximoEventoResponseDto } from '../../../../core/application/dto/response/proximo-evento-response.dto';
import { DadosDashboardResponseDto } from '../../../../core/application/dto/response/dados-dashboard-response.dto';

@Component({
  selector: 'app-dashboard-inicial',
  standalone: false,
  templateUrl: './dashboard-inicial.component.html',
  styleUrl: './dashboard-inicial.component.scss',
})
export class DashboardInicialComponent {
  private readonly _formBuilder = inject(FormBuilder);

  animacoes = [
    'animation-man.json',
    'animation-man-alt.json',
    'animation-woman.json',
  ];

  options: AnimationOptions = {
    path: `/animations/${
      this.animacoes[Math.floor(Math.random() * this.animacoes.length)]
    }`,
    renderer: 'svg',
    loop: true,
  };

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-error.json',
    renderer: 'svg',
    loop: false,
  };

  regioes: TabelaDominioResponseDto[] = [];

  formRegiao = this._formBuilder.group({
    regiao: ['', Validators.required],
  });

  proximoEvento: ProximoEventoResponseDto;
  exibicaoDashboard: boolean = false;
  exibicaoCardEventoNaoEncontrado: boolean = false;
  dadosDashboard: DadosDashboardResponseDto;

  constructor(
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarProximoEventoUsecase: BuscarProximoEventoUseCase,
    private readonly buscarDadosDashboardUsecase: BuscarDadosDashboardUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarRegiao();
  }
  public buscarRegiao() {
    this.buscarRegiaoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.regioes = this.formatarNomes(resposta);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar regiões:', erro);
      },
    });
  }

  public selecionarRegiao(evento: any) {
    this.buscarEvento();
  }

  public buscarEvento() {
    this.buscarProximoEventoUsecase
      .execute(parseInt(this.formRegiao.get('regiao')?.value))
      .subscribe({
        next: (resposta) => {
          if (resposta) {
            this.proximoEvento = resposta;
            this.buscarDadosDashboard(resposta.id);
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar eventos:', erro);
        },
      });
  }

  private buscarDadosDashboard(idEvento: number = 1) {
    this.buscarDadosDashboardUsecase.execute(idEvento).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.dadosDashboard = resposta;
          this.exibicaoDashboard = true;
          this.exibicaoCardEventoNaoEncontrado = false;
        } else {
          this.exibicaoCardEventoNaoEncontrado = true;
          this.exibicaoDashboard = false;
        }
      },
      error: (erro) => {
        this.exibicaoCardEventoNaoEncontrado = true;
        this.exibicaoDashboard = false;
        console.error('Erro ao buscar dados do dashboard:', erro);
      },
    });
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
