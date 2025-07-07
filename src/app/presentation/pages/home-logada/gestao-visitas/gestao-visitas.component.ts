import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { NomePipe } from '../../../pipes/nome.pipe';

@Component({
  selector: 'app-gestao-visitas',
  standalone: false,
  templateUrl: './gestao-visitas.component.html',
  styleUrl: './gestao-visitas.component.scss'
})
export class GestaoVisitasComponent {
  
  private readonly _formBuilder = inject(FormBuilder);

  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  formEvento = this._formBuilder.group({
    evento: ['', Validators.required],
  });

  eventosSelect: TabelaDominioResponseDto[] = [];
  eventoId: number | null = null;

  constructor(
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
        console.error('Erro ao buscar eventos:', erro);
      },
    });
  }
}
