import { Component } from '@angular/core';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { ResumoInscricaoDto } from '../../../../core/application/dto/resumo-inscricao.dto';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { InserirInscricaoUseCase } from '../../../../core/application/use-cases/inscricao/inserir-inscricao.usecase';
import { BuscarInscricaoUseCase } from '../../../../core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { InscricaoResponseDto } from '../../../../core/application/dto/response/inscricao-response.dto';

@Component({
  selector: 'app-confirmacao',
  standalone: false,
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss',
})
export class ConfirmacaoComponent {

  resumoInscricao: ResumoInscricaoDto;
  inscricaoUsuario: InscricaoRequestDto;
  statusInscricao: InscricaoResponseDto;

  constructor(
    private readonly router: Router,
    private readonly inserirInscricaoUsecase: InserirInscricaoUseCase,
    private readonly buscarInscricaoUsecase: BuscarInscricaoUseCase
  ) {}

  ngOnInit() {
    this.resumoInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.RESUMO_INSCRICAO)) as ResumoInscricaoDto;
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
  }

  inserirInscricao() {
    this.inserirInscricaoUsecase.execute(this.inscricaoUsuario).subscribe({
      next: (resultado) => {
        if (resultado) {
          localStorage.setItem(
            ParametroStorageEnum.USUARIO_EXISTENTE,
            JSON.stringify(resultado)
          );
          this.buscarInscricao(this.inscricaoUsuario.idEvento, resultado.id);
          this.prosseguir();
        }
      },
      error: (error) => {
        
      },
    });
  }

  public buscarInscricao(idEvento: number, idUsuario: number) {
    this.buscarInscricaoUsecase.execute(idEvento, idUsuario).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.statusInscricao = resposta;
          localStorage.setItem(
            ParametroStorageEnum.STATUS_INSCRICAO,
            JSON.stringify(this.statusInscricao)
          );
        }
      },
      error: (erro) => {},
    });
  }

  verificarInscricaoMenor() {
    return this.resumoInscricao.inscricaoMenor[0].nome === '';
  }

  verificarIgrejaNova() {
    return this.resumoInscricao.igrejaNova.nome === '';
  }

  prosseguir() {
    this.router.navigate([Rotas.CADASTRO, Rotas.SUCESSO_CADASTRO]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.CONFIRMACAO_DADOS_CADASTRO]);
  }
}
