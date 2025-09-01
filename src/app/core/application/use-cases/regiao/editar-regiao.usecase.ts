import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditarRegiaoPort } from "../../../domain/ports/regiao/editar-regiao.port";

@Injectable({ providedIn: 'root' })
export class EditarRegiaoUseCase {
  constructor(private readonly editarRegiaoPort: EditarRegiaoPort) {}

  execute(id: number, descricao: string): Observable<null> {
    return this.editarRegiaoPort.editarRegiao(id, descricao);
  }
}