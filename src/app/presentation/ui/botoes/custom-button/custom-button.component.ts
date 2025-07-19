import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: false,
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() texto?: string;
  @Input() icone?: string;
  @Input() posicaoIcone: 'left' | 'right' = 'right';
  @Input() disabled = false;
  @Input() variante: 'primario' | 'secundario' | 'icone' | 'alerta' | 'iconeAlt' | 'vazio' = 'primario';
  @Input() tamanhoIcone = 'w-4';
  @Input() exibir = true;
  @Input() classeCustom?: string;

  @Output() aoClicar = new EventEmitter<void>();

  get classes(): string {
    const base = 'rounded-[0.5rem]  text-size-base sm:text-size-md font-semibold flex items-center justify-center gap-2 py-2.5';
    const disabledClass = this.disabled ? 'opacity-60 cursor-not-allowed' : '';

    const variantes: Record<string, string> = {
      primario: 'bg-primary-blue text-white px-4 w-full',
      secundario: 'bg-white border-2 border-primary-blue text-primary-blue px-4 w-full',
      alerta: 'bg-amber-500 text-white px-4',
      icone: 'w-6 h-6 bg-primary-blue text-white p-0 rounded-full justify-center',
      iconeAlt: 'w-8 h-8 flex text-size-md items-center justify-center text-white bg-primary-blue rounded-full',
      vazio: 'text-size-xs sm:text-size-base text-[#222] opacity-70 underline',
    };

    return [base, variantes[this.variante], disabledClass,  this.classeCustom].join(' ');
  }
}
