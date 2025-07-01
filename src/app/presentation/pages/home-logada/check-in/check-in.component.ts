import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-check-in',
  standalone: false,
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
})
export class CheckInComponent {
  private readonly _formBuilder = inject(FormBuilder);

  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  formCheckin = this._formBuilder.group({
    funcaoEvento: [''],
    periodo: [''],
    nome: [''],
  });

  periodos: TabelaDominioResponseDto[] = [
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];

  resposta = [
    {
      idCheckin: 1,
      presenca: false,
      nome: 'Matheus V G D Ribeiro',
      igreja: { igreja: 'São Pedro', classe: 'JOVEM' },
      evento: { periodo: 'Manhã', funcaoEvento: 'EVANGELISTA' },
    },
    {
      idCheckin: 2,
      presenca: true,
      nome: 'Zezinho da Costa',
      igreja: { igreja: 'Teste inscrição', classe: 'VARÕES' },
      evento: { periodo: 'Tarde', funcaoEvento: 'CHECK-IN' },
    },
    {
      idCheckin: 3,
      presenca: false,
      nome: 'Israel Costa',
      igreja: { igreja: 'PORTO DA PEDRA', classe: 'VARÕES' },
      evento: { periodo: 'Tarde', funcaoEvento: 'CHECK-IN' },
    },
    {
      idCheckin: 4,
      presenca: false,
      nome: 'Vinicius Rodrigues Bastos',
      igreja: { igreja: 'MUTUÁ', classe: 'JOVEM' },
      evento: { periodo: 'Tarde', funcaoEvento: 'TELECOMUNICAÇÕES' },
    },
    {
      idCheckin: 5,
      presenca: true,
      nome: 'teste',
      igreja: { igreja: 'BARRO VERMELHO', classe: 'JOVEM' },
      evento: { periodo: 'Tarde', funcaoEvento: 'INSTRUMENTISTA' },
    },
  ];


  constructor(
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarFuncaoEvento();
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(1).subscribe({
      next: (resultado) => {
        this.opcoesFuncaoEvento = this.formatarNomes(resultado);
      },
      error: () => {},
    });
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }
  
}
