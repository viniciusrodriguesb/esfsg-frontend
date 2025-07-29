import { Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-resultado-nao-encontrado',
  standalone: false,
  templateUrl: './resultado-nao-encontrado.component.html',
  styleUrl: './resultado-nao-encontrado.component.scss',
})
export class ResultadoNaoEncontradoComponent {
  @Input()
  titulo: string = ''

  @Input()
  mensagem: string = ''

  @Input()
  exibicao: boolean = false

  @Input()
  variante: 'primario' | 'secundario' = 'primario'

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  get classes(): string {
    const base = 'bg-white  pb-5 pl-5 pr-5 xl:pb-12 xl:pl-12 xl:pr-12 relative flex flex-col items-center';

    const variantes: Record<string, string> = {
      primario: 'rounded-b-2xl',
      secundario: 'border border-dashed border-gray-300 rounded-2xl',
    };

    return [base, variantes[this.variante]].join(' ');
  }
}
