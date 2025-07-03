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
import { BuscarInscricaoUseCase } from '../../../../core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { UsuarioResponseDto } from '../../../../core/application/dto/response/usuario-response.dto';
import { ResumoInscricaoDto } from '../../../../core/application/dto/resumo-inscricao.dto';
import { InscricaoResponseDto } from '../../../../core/application/dto/response/inscricao-response.dto';
import { StatusHttpEnum } from '../../../../core/domain/enums/status-http.enum';

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
  usuarioExistente: UsuarioResponseDto;
  resumoInscricao: ResumoInscricaoDto;
  statusInscricao: InscricaoResponseDto;

  constructor(
    private readonly buscarRegiaoUsecase: BuscarRegiaoUseCase,
    private readonly buscarEventoUsecase: BuscarEventoUseCase,
    private readonly buscarInscricaoUsecase: BuscarInscricaoUseCase,
    private readonly router: Router,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarRegiao();
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
    this.usuarioExistente = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)) as UsuarioResponseDto;
    this.resumoInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.RESUMO_INSCRICAO)) as ResumoInscricaoDto;
  }

  public buscarInscricao(idEvento: number) {
    this.buscarInscricaoUsecase.execute(idEvento, this.usuarioExistente.id).subscribe({
      next: (resposta) => {
        if(resposta){
          this.statusInscricao = resposta;
          localStorage.setItem(ParametroStorageEnum.STATUS_INSCRICAO, JSON.stringify(this.statusInscricao));
          this.router.navigate([Rotas.PERFIL]);
        }else{
          this.resumoInscricao.evento.nome = this.eventos.find(evento => evento.id === idEvento)?.nome || '';

          this.preencherResumoComUsuarioExistente();

          localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario));
          localStorage.setItem(ParametroStorageEnum.RESUMO_INSCRICAO, JSON.stringify(this.resumoInscricao));

          this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_EVENTO]);
        }
      },
      error: (erro) => {
        if (erro.status === StatusHttpEnum.NOT_FOUND  ) {
          localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario));
          this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_EVENTO]);
        }
      },
    });
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

    if(this.usuarioExistente !== null) {
      this.buscarInscricao(idEvento);
    }else{
      this.resumoInscricao.evento.nome = this.eventos.find(evento => evento.id === idEvento)?.nome || '';
      
      localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario));
      localStorage.setItem(ParametroStorageEnum.RESUMO_INSCRICAO, JSON.stringify(this.resumoInscricao));

      this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_PESSOAIS]);
    }
  }

  voltar() {
    this.router.navigate([Rotas.LOGIN, Rotas.LOGIN_USUARIO]);
  }

  private preencherResumoComUsuarioExistente() {
    this.resumoInscricao.usuario.nome = this.usuarioExistente.nomeCompleto;
    this.resumoInscricao.usuario.cpf = this.usuarioExistente.cpf;
    this.resumoInscricao.usuario.email = this.usuarioExistente.email;
    this.resumoInscricao.usuario.telefone = this.usuarioExistente.telefone ?? '';
    this.resumoInscricao.usuario.dataNascimento = this.usuarioExistente.nascimento;
    this.resumoInscricao.usuario.pcd = this.usuarioExistente.pcd;
    this.resumoInscricao.usuario.condicaoMedica = this.usuarioExistente.condicoesMedica || [];
    this.resumoInscricao.usuario.funcoesIgreja = this.usuarioExistente.funcoesIgreja || [];
    this.resumoInscricao.usuario.instrumentos = this.usuarioExistente.instrumentos || [];
    this.resumoInscricao.usuario.dons = this.usuarioExistente.possuiDons ? 'Sim' : 'Não';
    this.resumoInscricao.igrejaExiste.classe = this.usuarioExistente.classe.descricao;
  }
}
