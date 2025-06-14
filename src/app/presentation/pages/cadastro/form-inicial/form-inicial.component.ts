import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { BuscarRegiaoUseCase } from '../../../../core/application/use-cases/regiao/buscar-regiao.usecase';
import { BuscarEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-evento.usecase';
import { EventoResponseDto } from '../../../../core/application/dto/response/evento-response.dto';
import { NomePipe } from '../../../pipes/nome.pipe';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';

@Component({
  selector: 'app-form-inicial',
  standalone: false,
  templateUrl: './form-inicial.component.html',
  styleUrl: './form-inicial.component.scss',
})
export class FormInicialComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formInicial = this._formBuilder.group({
    regiao: ['', Validators.required],
  });

  exibeCampos = false;
  regioes: TabelaDominioResponseDto[] = [];
  eventos: EventoResponseDto[] = [];
  inscricaoUsuario: InscricaoRequestDto;

  constructor(
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly router: Router,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarRegiao();
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
  }

  public buscarEvento() {
    this.buscarEventoUsecase
      .execute(parseInt(this.formInicial.get('regiao')?.value))
      .subscribe({
        next: (resposta) => {
          if (resposta) {
            this.eventos = resposta;
            this.exibeCampos = true;
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar eventos:', erro);
        },
      });
  }

  private formatarNomes( nomes: TabelaDominioResponseDto[]): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({ ...nome, descricao: this.nomePipe.transform(nome.descricao)}));
  }

  public buscarRegiao() {
    this.buscarRegiaoUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.regioes = this.formatarNomes(resposta);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar regiões:', erro);
      },
    });
  }

  public selecionarRegiao(evento: any) {
    this.buscarEvento();
  }

  prosseguir(idEvento: number) {
    this.inscricaoUsuario.idEvento = idEvento;

    localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario));
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
  }
}
