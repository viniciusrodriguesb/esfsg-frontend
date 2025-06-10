import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-dados-igreja',
  standalone: false,
  templateUrl: './form-dados-igreja.component.html',
  styleUrl: './form-dados-igreja.component.scss',
})
export class FormDadosIgrejaComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formCadastro = this._formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    nomeCompleto: ['', Validators.required],
    telefone: ['', Validators.required],
    nascimento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    classe: ['', Validators.required],
    igreja: ['', Validators.required],
    dons: ['', Validators.required],
    deficiencia: ['', Validators.required],
    possuiFilhos: [null, Validators.required],
    qntdFilhos: [0, Validators.required],
  });

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  opcoesBoleanas: TabelaDominioResponseDto[] = [
    { id: 1, descricao: 'Sim' },
    { id: 2, descricao: 'Não' },
  ];

  formSubmetido = false;

  classes: TabelaDominioResponseDto[] = [];
  igrejas: TabelaDominioResponseDto[] = [];

  validacaoFilhos = true;

  constructor(
    private readonly buscarClasseUsecase: BuscarClasseUseCase,
    private readonly buscarFuncaoIgrejasUsecase: BuscarFuncaoIgrejaUseCase,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buscarClasse();
    this.buscarIgrejas();
    this.iniciarCamposFormulario();
  }

  public buscarIgrejas() {
    this.buscarFuncaoIgrejasUsecase.execute().subscribe({
      next: (igrejas) => {
        this.igrejas = igrejas;
        console.log(igrejas);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public buscarClasse() {
    this.buscarClasseUsecase.execute().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  tes(valor: any) {
    console.log(valor);

    if (valor == 1) {
      this.formCadastro.get('qntdFilhos')?.enable();
      this.validacaoFilhos = false;
    } else {
      this.formCadastro.get('qntdFilhos')?.disable();
      this.formCadastro.get('qntdFilhos')?.setValue(0);
      this.validacaoFilhos = true;
    }
  }

  iniciarCamposFormulario() {
    this.formCadastro.get('qntdFilhos')?.disable();
  }

  prosseguir() {
    localStorage.setItem(
      'formCadastro',
      JSON.stringify(this.formCadastro.value)
    );
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }

  testar() {
    this.formSubmetido = true;
    console.log(this.formCadastro.get('cpf')?.value);
    console.log(this.formCadastro.valid);

    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }

    // lógica de envio...
  }
}
