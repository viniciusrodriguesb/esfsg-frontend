import { Component } from '@angular/core';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { Router } from '@angular/router';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';

@Component({
  selector: 'app-confirmacao',
  standalone: false,
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss',
})
export class ConfirmacaoComponent {
  inscricaoUsuario: InscricaoRequestDto = {
    cpf: '123.456.789-00',
    periodo: '27 a 31 de Dezembro de 2024',
    idFuncaoEvento: 2,
    idEvento: 1,
    visita: {
      visita: true,
      carro: true,
      vagas: 4,
    },
    usuario: {
      nomeCompleto: 'Lucas Andrade',
      cpf: '987.654.321-00',
      senha: 'SenhaSegura123!',
      email: 'lucas.andrade@email.com',
      telefone: '(21) 99876-5432',
      nascimento: '2000-04-25',
      pcd: 'Nenhuma',
      dons: true,
      idIgreja: 5,
      idClasse: 2,
      condicoesMedicas: [1, 3], // Por exemplo: 1 = Diabetes, 3 = Asma
      instrumentos: [2, 5], // Ex: 2 = Violão, 5 = Teclado
      funcoesIgreja: [1, 4], // Ex: 1 = Líder de Louvor, 4 = Professor
    },
    inscricaoMenor: [
      {
        nome: 'Maria Silva',
        idade: 12,
        idCondicaoMedica: 1,
      },
      {
        nome: 'Pedro Silva',
        idade: 10,
        idCondicaoMedica: 2,
      },
    ],
    igreja: {
      nome: 'Igreja Batista Central',
      idRegiao: 3,
      pastor: 'Pastor Carlos',
    },
  };

  constructor(private readonly router: Router) {}

  prosseguir() {
    this.router.navigate([Rotas.CADASTRO, Rotas.SUCESSO_CADASTRO]);
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.CONFIRMACAO_DADOS_CADASTRO]);
  }
}
