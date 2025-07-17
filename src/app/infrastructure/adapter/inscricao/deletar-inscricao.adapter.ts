import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ParametrosHttpEnum } from "../../../core/domain/enums/parametros-http.enum";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { DeletarInscricaoPort } from "../../../core/domain/ports/inscricao/deletar-inscricao.port";

@Injectable({ providedIn: 'root' })
export class DeletarInscricaoAdapter extends DeletarInscricaoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  deletarInscricao(id: number): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    try {
      return this.http.delete<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Inscricao}/${ENVIRONMENT.VERSAO}`, { params });
    } catch (error) {
      
      return of(null);
    }
  }
}