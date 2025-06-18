import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { BuscarIgrejaPort } from '../../../core/domain/ports/igreja/buscar-igreja.port';

@Injectable({ providedIn: 'root' })
export class BuscarIgrejaAdapter extends BuscarIgrejaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarIgrejas(): Observable<TabelaDominioResponseDto[] | null> {
    // Retorna uma lista fixa de igrejas para testes
    const listaFixa: TabelaDominioResponseDto[] = [
      { id: 1, descricao: 'Mutuá' },
      { id: 2, descricao: 'Rocha' },
      { id: 3, descricao: 'Alcântara' }
    ];
    return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Igreja}/${ENVIRONMENT.VERSAO}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar igrejas:', error);
        return of(listaFixa);
      })
    );
  }
}
