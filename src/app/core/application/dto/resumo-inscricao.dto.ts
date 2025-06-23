export class ResumoInscricaoDto {
  visita: ResumoVisita = new ResumoVisita();
  usuario: ResumoUsuario = new ResumoUsuario();
  inscricaoMenor: ResumoInscricaoMenor[] = [];
  igrejaExiste: ResumoIgrejaExistente = new ResumoIgrejaExistente();
  igrejaNova: ResumoIgrejaNova = new ResumoIgrejaNova();
  evento: ResumoEvento = new ResumoEvento();
}

export class ResumoUsuario {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  telefone: string = '';
  dataNascimento: string = '';
  pcd: string = '';
  dons: string = '';
  condicaoMedica: string[] = [];
  instrumentos: string[] = [];
  funcoesIgreja: string[] = [];
}

export class ResumoIgrejaExistente {
  nome: string = '';
  classe: string = '';
}

export class ResumoEvento {
  nome: string = '';
  periodo: string = '';
  funcao: string = '';
}

export class ResumoIgrejaNova {
  nome: string = '';
  regiao: string = '';
  pastor: string = '';
}

export class ResumoInscricaoMenor {
  nome: string = '';
  idade: number = 0;
  condicaoMedica: string = '';
}

export class ResumoVisita {
  visita: string = '';
  carro: string = '';
  vagas: number = 0;
}
