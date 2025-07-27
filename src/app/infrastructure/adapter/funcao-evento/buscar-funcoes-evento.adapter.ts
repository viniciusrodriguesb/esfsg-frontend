import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarTodasFuncoesEventoPort } from '../../../core/domain/ports/funcao-evento/buscar-todas-funcoes-evento.port';
import { FuncaoEventoResponse } from '../../../core/application/dto/response/funcoes-eventoresponse.dto';

@Injectable({ providedIn: 'root' })
export class BuscarTodasFuncoesEventoAdapter extends BuscarTodasFuncoesEventoPort {
  private readonly endpoint = `${ENVIRONMENT.URL_API}/${ControllersEnum.FuncaoEvento}/${ENVIRONMENT.VERSAO}`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  override buscarTodasFuncoesEvento(): Observable<FuncaoEventoResponse[] | null> {return this.http.get<FuncaoEventoResponse[]>(this.endpoint)
    .pipe(catchError((error) => {return of(null);})
    );
    
  }
}
