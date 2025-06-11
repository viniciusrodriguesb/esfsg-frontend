import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { BuscarInstrumentoUseCase } from '../../../../core/application/use-cases/instrumento/buscar-instrumento.usecase';

@Component({
  selector: 'app-form-dados-pessoais',
  standalone: false,
  templateUrl: './form-dados-pessoais.component.html',
  styleUrl: './form-dados-pessoais.component.scss',
})
export class FormDadosPessoaisComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosPessoais = this._formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    nomeCompleto: ['', Validators.required],
    telefone: ['', Validators.required],
    nascimento: ['', Validators.required],
    email: ['', [Validators.email]],
  });

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
    private readonly router: Router,

  ) {}

  ngOnInit() {
    this.buscarClasse();
    this.buscarIgrejas();
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

  prosseguir() {
    localStorage.setItem(
      'formDadosPessoais',
      JSON.stringify(this.formDadosPessoais.value)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  voltar() {
    this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
  }
}
