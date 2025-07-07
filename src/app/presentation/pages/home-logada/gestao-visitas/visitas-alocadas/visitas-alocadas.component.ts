import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-visitas-alocadas',
  standalone: false,
  templateUrl: './visitas-alocadas.component.html',
  styleUrl: './visitas-alocadas.component.scss',
})
export class VisitasAlocadasComponent {
  @Input() public eventoId: number;

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

    ngOnChanges() {
    if (this.eventoId) {
      this.buscarVisitasAlocadas();
    }
  }

  public buscarVisitasAlocadas() {
    // Implementar lógica para buscar visitas alocadas
  }
}
