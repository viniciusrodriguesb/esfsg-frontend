import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { BuscarRegiaoUseCase } from '../../../../core/application/use-cases/regiao/buscar-regiao.usecase';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { EventoResponseDto } from '../../../../core/application/dto/response/evento-response.dto';

@Component({
  selector: 'app-form-inicial',
  standalone: false,
  templateUrl: './form-inicial.component.html',
  styleUrl: './form-inicial.component.scss',
})
export class FormInicialComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formInicial = this._formBuilder.group({
    regioes: [null, Validators.required],
  });

  exibeCampos = false;
  regioes: TabelaDominioResponseDto[] = [];
  eventos: EventoResponseDto[] = [];

  constructor(
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buscarRegiao();
  }

  public buscarEvento() {
    this.buscarEventoUsecase
      .execute(this.formInicial.get('regioes')?.value)
      .subscribe({
        next: (resposta) => {
          this.eventos = resposta;
          if (resposta) {
            console.log('Eventos encontrados:', resposta);
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar eventos:', erro);
        },
      });
  }

  public buscarRegiao() {
    this.buscarRegiaoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.regioes = resposta;
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar regiões:', erro);
      },
    });
  }

  public selecionarRegiao(evento: any) {
    this.buscarEvento();
    this.exibeCampos = true;
    console.log('Eventos:', this.eventos);
  }

  prosseguir() {
    localStorage.setItem(
      'formCadastro',
      JSON.stringify(this.formInicial.value)
    );
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }
}
