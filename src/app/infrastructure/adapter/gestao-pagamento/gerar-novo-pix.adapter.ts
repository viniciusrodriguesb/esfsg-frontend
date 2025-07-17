import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllersEnum } from '../../../core/domain/enums/controllers.enum';
import { ENVIRONMENT } from '../../../environment/environment-des';
import { GerarNovoPixPort } from '../../../core/domain/ports/gestao-pagamento/gerar-novo-pix.port';
import { ResponsePadraoDto } from '../../../core/application/dto/response/response-padrao.dto';

@Injectable({ providedIn: 'root' })
export class GerarNovoPixAdapter extends GerarNovoPixPort {
  constructor(private readonly http: HttpClient) {
    super();
  }

  gerarNovoPix(idInscricao: number): Observable<ResponsePadraoDto<null>> {
    try {
      return this.http.post<ResponsePadraoDto<null>>(
        `${ENVIRONMENT.URL_API}/${ControllersEnum.GestaoPagamento}/${ENVIRONMENT.VERSAO}/Pix/Gerar`,
        JSON.stringify(idInscricao),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      
      return of(null);
    }
  }

}
