export class TabelaDominioResponseDto {
  id: number;
  descricao: string;

  constructor(id: number, descricao: string) {
    this.id = id;
    this.descricao = descricao;
  }
}
