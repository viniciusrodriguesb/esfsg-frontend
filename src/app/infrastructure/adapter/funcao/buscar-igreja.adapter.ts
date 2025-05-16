import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { BuscarIgrejaPort } from "../../../core/domain/ports/funcao/buscar-igreja.port";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { TabelaDominioResponseDto } from "../../../core/application/dto/response/tabela-dominio-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarIgrejaAdapter extends BuscarIgrejaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarIgreja(): Observable<TabelaDominioResponseDto[] | null> {
    try {
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Funcao}/${ENVIRONMENT.VERSAO}/igreja`);
    } catch (error) {
      console.error('Erro ao buscar igrejas:', error);
      return of(null);
    }
  }
}