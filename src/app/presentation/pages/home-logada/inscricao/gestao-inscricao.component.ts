import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { NomePipe } from '../../../pipes/nome.pipe';

@Component({
  selector: 'app-gestao-inscricao',
  standalone: false,
  templateUrl: './gestao-inscricao.component.html',
  styleUrl: './gestao-inscricao.component.scss',
})
export class GestaoInscricaoComponent {
  private readonly _formBuilder = inject(FormBuilder);
  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  activeTab: 'pendentes' | 'todas' = 'pendentes';

  formEvento = this._formBuilder.group({
    evento: ['', Validators.required],
  });

  eventosSelect: TabelaDominioResponseDto[] = [];
  eventoId: number | null = null;

  constructor(
    private readonly router: Router,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarEvento();
  }

  public selecionarEvento(eventoId: any) {
    this.eventoId = eventoId;
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

      },
    });
  }

  irPara(destino: 'pendentes' | 'todas') {
    this.activeTab = destino;

    if (destino === 'pendentes') {
      this.router.navigate([
        Rotas.HOME_LOGADA,
        Rotas.GESTAO_INSCRICAO,
        Rotas.PENDENTES_APROVACAO,
      ]);
    } else {
      this.router.navigate([
        Rotas.HOME_LOGADA,
        Rotas.GESTAO_INSCRICAO,
        Rotas.OBTER_TODAS,
      ]);
    }
  }
}
