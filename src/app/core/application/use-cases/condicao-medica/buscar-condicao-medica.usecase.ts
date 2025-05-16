import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TabelaDominioResponseDto } from "../../dto/response/tabela-dominio-response.dto";
import { BuscarCondicaoMedicaPort } from "../../../domain/ports/condicao-medica/buscar-condicao-medica.port";

@Injectable({ providedIn: 'root' })
export class BuscarCondicaoMedicaUseCase {
  constructor(private readonly buscarCondicaoMedicaPort: BuscarCondicaoMedicaPort) {}

  execute(): Observable<TabelaDominioResponseDto[] | null> {
    return this.buscarCondicaoMedicaPort.buscarCondicoesMedicas();
  }
}
