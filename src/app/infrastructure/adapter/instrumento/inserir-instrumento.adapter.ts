import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { InserirInstrumentoPort } from "../../../core/domain/ports/instrumento/inserir-instrumento.port";
import { ENVIRONMENT } from "../../../environment/environment-des";

@Injectable({ providedIn: 'root' })
export class InserirInstrumentoAdapter extends InserirInstrumentoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirInstrumento(descricao: string): Observable<null> {
    try {
      return this.http.post<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Instrumento}/${ENVIRONMENT.VERSAO}`, JSON.stringify(descricao),    { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Erro ao inserir instrumento:', error);
      return of(null);
    }
  }
}
