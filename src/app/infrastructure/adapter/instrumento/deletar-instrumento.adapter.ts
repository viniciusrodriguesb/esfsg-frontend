import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ParametrosHttpEnum } from "../../../core/domain/enums/parametros-http.enum";
import { DeletarInstrumentoPort } from "../../../core/domain/ports/instrumento/deletar-instrumento.port";
import { ENVIRONMENT } from "../../../environment/environment-des";

@Injectable({ providedIn: 'root' })
export class DeletarInstrumentoAdapter extends DeletarInstrumentoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  deletarInstrumento(id: number): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());

    try {
      return this.http.delete<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Instrumento}/${ENVIRONMENT.VERSAO}`, { params });
    } catch (error) {
      
      return of(null);
    }
  }
}
