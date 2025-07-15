import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove all non-digit characters
    const apenasNumeros = value.replace(/\D/g, '');

    // Format CPF
    if (apenasNumeros.length === 11) {
      return (
        apenasNumeros.slice(0, 3) +
        '.' +
        apenasNumeros.slice(3, 6) +
        '.' +
        apenasNumeros.slice(6, 9) +
        '-' +
        apenasNumeros.slice(9)
      );
    }

    return value;
  }
}
