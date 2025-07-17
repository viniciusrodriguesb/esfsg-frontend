import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { TabelaDominioResponseDto } from "../../../core/application/dto/response/tabela-dominio-response.dto";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { BuscarInstrumentoPort } from "../../../core/domain/ports/instrumento/buscar-instrumento.port";
import { ENVIRONMENT } from "../../../environment/environment-des";

@Injectable({ providedIn: 'root' })
export class BuscarInstrumentoAdapter extends BuscarInstrumentoPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarInstrumentos(): Observable<TabelaDominioResponseDto[] | null> {
    return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.Instrumento}/${ENVIRONMENT.VERSAO}`).pipe(
      catchError((error) => {
        
        return of(null);
      })
    );
  }
}