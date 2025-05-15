import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BuscarClassePort } from '../../core/domain/ports/buscar-classe.port';
import { TabelaDominioResponseDto } from './dto/response/tabela-dominio-response.dto';
import { ENVIRONMENT } from '../../environment/environment-des';
import { ControllersEnum } from '../../core/domain/enums/controllers.enum';

@Injectable({ providedIn: 'root' })
export class ClasseAdapter extends BuscarClassePort {
    
  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarClasses(): Observable<TabelaDominioResponseDto[] | null> {
    try {
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Classe}/${ENVIRONMENT.VERSAO}/obter-todas`);
    } catch (error) {
      console.error('Erro ao buscar classes:', error);
      return of(null);
    }
  }
}
