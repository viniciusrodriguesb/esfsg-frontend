import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-visitas-nao-alocadas',
  standalone: false,
  templateUrl: './visitas-nao-alocadas.component.html',
  styleUrl: './visitas-nao-alocadas.component.scss',
})
export class VisitasNaoAlocadasComponent {
  @Input() public eventoId: number;

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

    ngOnChanges() {
    if (this.eventoId) {
      this.buscarVisitasNaoAlocadas();
    }
  }

  public buscarVisitasNaoAlocadas() {
    // Implementar lógica para buscar visitas não alocadas
  }
}
