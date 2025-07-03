import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Rotas } from '../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  private readonly _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  formCadastro = this._formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    nomeCompleto: ['', Validators.required],
    telefone: ['', Validators.required],
    nascimento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],

  });

  formSubmetido = false;

  steps = [
    {
      label: 'Dados pessoais',
    },
    {
      label: 'Endereço',
    },
    {
      label: 'Contato',
    },
    {
      label: 'Confirmação',
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(){
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_INICIAL]);
  }

  testar() {
    this.formSubmetido = true;
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }
  }
}

//TODO: criar o formGroup para o cadastro de usuario
// cpf - o usuário ja coloca no começo
// nome_completo
// telefone
// nascimento
// email - usuario normal não precisa
// senha - usuario normal não precisa
// pcd
// dons
// possui_filhos
// qnt_filhos
// dh_inscricao
// dh_exclusao
// id_tipo_usuario
// id_igreja
// id_classe
// motivo_exclusao
