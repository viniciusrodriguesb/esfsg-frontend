import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { BuscarRegiaoUseCase } from '../../../../core/application/use-cases/regiao/buscar-regiao.usecase';
import { EventoResponseDto } from '../../../../core/application/dto/response/evento-response.dto';
import { NomePipe } from '../../../pipes/nome.pipe';

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

  regioes: TabelaDominioResponseDto[] = [];

  formRegiao = this._formBuilder.group({
    regiao: ['', Validators.required],
  });

  eventos: EventoResponseDto[] = [];

  constructor(
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit(){
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
    this.buscarEventoUsecase
      .execute(parseInt(this.formRegiao.get('regiao')?.value))
      .subscribe({
        next: (resposta) => {
          if (resposta) {
            this.eventos = resposta;
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar eventos:', erro);
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
