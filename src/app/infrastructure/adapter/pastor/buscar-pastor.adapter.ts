import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarPastorPort } from '../../../core/domain/ports/pastor/buscar-pastor.port';

@Injectable({ providedIn: 'root' })
export class BuscarPastorAdapter extends BuscarPastorPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarPastores(): Observable<TabelaDominioResponseDto[] | null> {
    return this.http
      .get<TabelaDominioResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Pastor}/${ENVIRONMENT.VERSAO}`
      )
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}
