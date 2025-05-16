import { Component } from '@angular/core';
import { BuscarClasseUseCase } from './core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { InserirCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/inserir-condicao-medica.usecase';
import { DeletarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/deletar-condicao-medica.usecase';
import { EditarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/editar-condicao-medica.usecase';
import { BuscarIgrejaUseCase } from './core/application/use-cases/funcao/buscar-igreja.usecase';
import { BuscarEventoUseCase } from './core/application/use-cases/funcao/buscar-evento.usecase';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'esfsg-frontend';

  constructor(

  ) {}

  ngOnInit() {

  }
}
