import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { BuscarEventoPort } from "../../../core/domain/ports/funcao/buscar-evento.port";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { TabelaDominioResponseDto } from "../dto/response/tabela-dominio-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarEventoAdapter extends BuscarEventoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarEvento(): Observable<TabelaDominioResponseDto[] | null> {
    try {
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Funcao}/${ENVIRONMENT.VERSAO}/evento`);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return of(null);
    }
  }
}