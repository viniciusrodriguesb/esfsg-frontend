import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { BuscarFuncoesVisitaPort } from '../../../core/domain/ports/visita/buscar-funcoes-visita.port';
import { TabelaDominioResponseDto } from '../../../core/application/dto/response/tabela-dominio-response.dto';

@Injectable({ providedIn: 'root' })
export class BuscarFuncoesVisitaAdapter extends BuscarFuncoesVisitaPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarFuncoesVisita(): Observable<TabelaDominioResponseDto[] | null> {
    try {
      return this.http.get<TabelaDominioResponseDto[]>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.Visita}/${ENVIRONMENT.VERSAO}/funcoes`, 
      );
    } catch (error) {
      console.error('Erro ao buscar funções de visita:', error);
      return of(null);
    }
  }
}