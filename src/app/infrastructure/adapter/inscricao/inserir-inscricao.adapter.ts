import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { InscricaoRequestDto } from "../../../core/application/dto/request/inscricao-request.dto";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { InserirInscricaoPort } from "../../../core/domain/ports/inscricao/inserir-inscricao.port";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { UsuarioResponseDto } from "../../../core/application/dto/response/usuario-response.dto";

@Injectable({ providedIn: 'root' })
export class InserirInscricaoAdapter extends InserirInscricaoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  inserirInscricao(inscricao: InscricaoRequestDto): Observable<UsuarioResponseDto> {
    try {
      return this.http.post<null>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Inscricao}/${ENVIRONMENT.VERSAO}`, JSON.stringify(inscricao),    { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Erro ao inserir inscrição:', error);
      return of(null);
    }
  }
}