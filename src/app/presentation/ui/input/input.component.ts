import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: false,
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Output()
  formControllerChange = new EventEmitter();

  @Input() id: string = '';
  @Input() classeInput: string = '';
  @Input() placeholder: string = '';
  @Input() tipo: string = 'text';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() contemIcone: boolean = false;
  @Input() errorMessage: string = '';

  @Input() formSubmetido = false;

  formControllerValue: FormControl;
  mostrarSenha: boolean = false;

  @Input()
  get formController(): FormControl {
    return this.formControllerValue;
  }

  set formController(value: FormControl) {
    this.formControllerValue = value;
    this.formControllerChange.emit(this.formControllerValue);
  }

  get mostrarErro(): boolean {
    return this.formSubmetido && this.formController?.invalid;
  }

  get tipoInput(): string {
    if (this.tipo === 'password') {
      return this.mostrarSenha ? 'text' : 'password';
    }
    return this.tipo;
  }

  get mensagemErro(): string {
    if (!this.formController?.errors) return '';

    if (this.formController.errors['required'])
      return 'Este campo é obrigatório';
    if (this.formController.errors['minlength'])
      return 'Número mínimo de caracteres não atingido';
    if (this.formController.errors['maxlength'])
      return 'Número máximo de caracteres excedido';
    if (this.formController.errors['email']) return 'E-mail inválido';

    return 'Campo inválido';
  }
}
