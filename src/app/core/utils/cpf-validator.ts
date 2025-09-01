import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, '');

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  if (
    parseInt(cpf.charAt(9)) !== digito1 ||
    parseInt(cpf.charAt(10)) !== digito2
  ) {
    return { cpfInvalido: true };
  }

  return null;
}
