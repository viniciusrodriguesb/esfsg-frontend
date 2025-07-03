import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: false,
  styleUrl: './input.component.scss',
})
export class InputComponent {
  formControllerValue: FormControl;
  mostrarSenha: boolean = false;

  @Input() id: string = '';
  @Input() classeInput: string = '';
  @Input() placeholder: string = null;
  @Input() tipo: string = 'text';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() contemIcone: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() errorMessage: string = '';
  @Input() formSubmetido = false;
  @Input() mask: string = '';
  @Input() opcoes: TabelaDominioResponseDto[] = [];
  @Input()
  get formController(): FormControl {
    return this.formControllerValue;
  }

  @Output() valorSelecionado = new EventEmitter<any>();


  @Output()
  formControllerChange = new EventEmitter();

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

  set formController(value: FormControl) {
    this.formControllerValue = value;
    this.formControllerChange.emit(this.formControllerValue);
  }

  aoSelecionar(event: Event) {
  const valor = (event.target as HTMLSelectElement).value;
  this.valorSelecionado.emit(valor);
}
}
