import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ParametrosHttpEnum } from "../../../core/domain/enums/parametros-http.enum";
import { EditarInscricaoPort } from "../../../core/domain/ports/inscricao/editar-inscricao.port";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { InscricaoRequestDto } from "../../../core/application/dto/request/inscricao-request.dto";

@Injectable({ providedIn: 'root' })
export class EditarInscricaoAdapter extends EditarInscricaoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  editarInscricao(id: number, inscricao: InscricaoRequestDto): Observable<null> {
    let params = new HttpParams();
    params = params.append(ParametrosHttpEnum.Id, id.toString());
    
    try {
      return this.http.put<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Inscricao}/${ENVIRONMENT.VERSAO}`,  JSON.stringify(inscricao), { headers: { 'Content-Type': 'application/json' }, params });
    } catch (error) {
      
      return of(null);
    }
  }
}