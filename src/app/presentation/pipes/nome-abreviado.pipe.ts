import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomeAbreviado',
})
export class NomeAbreviadoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const nomes = value.trim().split(/\s+/);

    if (nomes.length === 1) {
      return this.capitalize(nomes[0]);
    }

    const primeiro = this.capitalize(nomes[0]);
    const ultimo = this.capitalize(nomes[nomes.length - 1]);

    const intermediarios = nomes.slice(1, -1).map(n => n.charAt(0).toUpperCase());

    return [primeiro, ...intermediarios, ultimo].join(' ');
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
