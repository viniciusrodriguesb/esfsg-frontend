import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { TabelaDominioResponseDto } from "../../../core/application/dto/response/tabela-dominio-response.dto";
import { BuscarFuncaoIgrejaPort } from "../../../core/domain/ports/funcao/buscar-funcao-igreja.port";

@Injectable({ providedIn: 'root' })
export class BuscarFuncaoIgrejaAdapter extends BuscarFuncaoIgrejaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarFuncaoIgreja(): Observable<TabelaDominioResponseDto[] | null> {
  
    const listaFixa: TabelaDominioResponseDto[] = [
      { id: 1, descricao: 'Secretária(o)' },
      { id: 2, descricao: 'Professor(a)' },
      { id: 3, descricao: 'Coordenador(a)' }
    ];
    return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Funcao}/${ENVIRONMENT.VERSAO}/igreja`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar funções de igreja:', error);
        return of(listaFixa);
      })
    );
  }
}