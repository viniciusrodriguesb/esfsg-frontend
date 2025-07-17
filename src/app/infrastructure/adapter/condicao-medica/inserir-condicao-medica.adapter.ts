import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { InserirCondicaoMedicaPort } from "../../../core/domain/ports/condicao-medica/inserir-condicao-medica.port";
import { ENVIRONMENT } from "../../../environment/environment-des";

@Injectable({ providedIn: 'root' })
export class InserirCondicaoMedicaAdapter extends InserirCondicaoMedicaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirCondicaoMedica(descricao: string): Observable<null> {
    try {
      return this.http.post<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.CondicaoMedica}/${ENVIRONMENT.VERSAO}`, JSON.stringify(descricao),    { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
     
      return of(null);
    }
  }
}
