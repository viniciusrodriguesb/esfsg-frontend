import { Component } from '@angular/core';
import { BuscarClasseUseCase } from './core/application/use-cases/buscar-classe.usecase';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'esfsg-frontend';

  constructor(private readonly buscarClasseUseCase: BuscarClasseUseCase) {}

  ngOnInit() {
    this.buscarClasseUseCase.execute().subscribe({
      next: (response) => {
        console.log('Classes:', response);
      },
      error: (error) => {
        console.error('Error fetching classes:', error);
      }
    });
  }
}
