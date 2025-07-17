import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { BuscarRegiaoPort } from '../../../core/domain/ports/regiao/buscar-regiao.port';

@Injectable({ providedIn: 'root' })
export class BuscarRegiaoAdapter extends BuscarRegiaoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarRegioes(): Observable<TabelaDominioResponseDto[] | null> {
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Regiao}/${ENVIRONMENT.VERSAO}`).pipe(
        catchError(error => {
          
          return of(null);
        })
      );
  }
}
