import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove all non-digit characters
    const apenasNumeros = value.replace(/\D/g, '');

    // Format phone number
    if (apenasNumeros.length === 11) {
      return (
        '(' +
        apenasNumeros.slice(0, 2) +
        ') ' +
        apenasNumeros.slice(2, 7) +
        '-' +
        apenasNumeros.slice(7)
      );
    }

    return value;
  }
}