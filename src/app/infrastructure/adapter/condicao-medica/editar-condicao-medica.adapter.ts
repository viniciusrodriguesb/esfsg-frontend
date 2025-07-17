import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { EditarCondicaoMedicaPort } from "../../../core/domain/ports/condicao-medica/editar-condicao-medica.port";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { ParametrosHttpEnum } from "../../../core/domain/enums/parametros-http.enum";

@Injectable({ providedIn: 'root' })
export class EditarCondicaoMedicaAdapter extends EditarCondicaoMedicaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  editarCondicaoMedica(id: number, descricao: string): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());
    
    try {
      return this.http.put<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.CondicaoMedica}/${ENVIRONMENT.VERSAO}`,  JSON.stringify(descricao), { headers: { 'Content-Type': 'application/json' }, params });
    } catch (error) {
 
      return of(null);
    }
  }
}