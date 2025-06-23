import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";

import { ENVIRONMENT } from "../../../environment/environment-des";
import { BuscarInscricaoPort } from "../../../core/domain/ports/inscricao/buscar-inscricao.port";
import { InscricaoResponseDto } from "../../../core/application/dto/response/inscricao-response.dto";

@Injectable({ providedIn: 'root' })
export class BuscarInscricaoAdapter extends BuscarInscricaoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarInscricao(idEvento: number, IdUsuario: number): Observable<InscricaoResponseDto> {
    let params = new HttpParams()
    params = params.append('idEvento', idEvento.toString());
    params = params.append('IdUsuario', IdUsuario.toString());

    return this.http.get<InscricaoResponseDto>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Inscricao}/${ENVIRONMENT.VERSAO}`, { params }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar inscrição:', error);
        return of(null);
      })
    );
  }
}