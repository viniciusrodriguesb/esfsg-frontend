import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ParametrosHttpEnum } from "../../../core/domain/enums/parametros-http.enum";
import { EditarInstrumentoPort } from "../../../core/domain/ports/instrumento/editar-instrumento.port";
import { ENVIRONMENT } from "../../../environment/environment-des";

@Injectable({ providedIn: 'root' })
export class EditarInstrumentoAdapter extends EditarInstrumentoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  editarInstrumento(id: number, descricao: string): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());
    
    try {
      return this.http.put<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Instrumento}/${ENVIRONMENT.VERSAO}`,  JSON.stringify(descricao), { headers: { 'Content-Type': 'application/json' }, params });
    } catch (error) {
      
      return of(null);
    }
  }
}