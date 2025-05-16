import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControllersEnum } from "../../../core/domain/enums/controllers.enum";
import { ENVIRONMENT } from "../../../environment/environment-des";
import { TabelaDominioResponseDto } from "../dto/response/tabela-dominio-response.dto";
import { BuscarCondicaoMedicaPort } from "../../../core/domain/ports/condicao-medica/buscar-condicao-medica.port";

@Injectable({ providedIn: 'root' })
export class BuscarCondicaoMedicaAdapter extends BuscarCondicaoMedicaPort {

  constructor(private readonly http: HttpClient) {
    super();
  }

  buscarCondicoesMedicas(): Observable<TabelaDominioResponseDto[] | null> {
    try {
      return this.http.get<TabelaDominioResponseDto[]>(`${ENVIRONMENT.URL_API}/${ControllersEnum.CondicaoMedica}/${ENVIRONMENT.VERSAO}`);
    } catch (error) {
      console.error('Erro ao buscar condições médicas:', error);
      return of(null);
    }
  }
}
