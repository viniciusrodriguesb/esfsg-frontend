import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { BuscarClassePort } from '../../../core/domain/ports/classe/buscar-classe.port';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';

@Injectable({ providedIn: 'root' })
export class BuscarClasseAdapter extends BuscarClassePort {
    
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarClasses(): Observable<TabelaDominioResponseDto[] | null> {
    // Retorna uma lista fixa de classes para testes
    const listaFixa: TabelaDominioResponseDto[] = [
      { id: 1, descricao: 'Classe A' },
      { id: 2, descricao: 'Classe B' },
      { id: 3, descricao: 'Classe C' }
    ];
    return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Classe}/${ENVIRONMENT.VERSAO}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar classes:', error);
        return of(listaFixa);
      })
    );
  }
}
