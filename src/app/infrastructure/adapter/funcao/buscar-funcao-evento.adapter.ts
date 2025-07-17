import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { TabelaDominioResponseDto } from "../../../core/application/dto/response/tabela-dominio-response.dto";
import { BuscarFuncaoEventoPort } from "../../../core/domain/ports/funcao/buscar-funcao-evento.port";

@Injectable({ providedIn: 'root' })
export class BuscarFuncaoEventoAdapter extends BuscarFuncaoEventoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarFuncaoEvento(idEvento: number): Observable<TabelaDominioResponseDto[] | null> {
      let params = new HttpParams();
      params = params.append('idEvento', idEvento.toString());
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Funcao}/${ENVIRONMENT.VERSAO}/evento`, { params }).pipe(
        catchError((error) => {
          
          return of(null);
        })
      );
  }
}