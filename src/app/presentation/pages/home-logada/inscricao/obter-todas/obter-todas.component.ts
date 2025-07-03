import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { GestaoInscricaoResponse } from '../../../../../core/application/dto/response/inscricoes-response-dto';
import { PaginacaoResponse } from '../../../../../core/application/dto/response/paginacao-response.dto';
import { GestaoInscricaoUseCase } from '../../../../../core/application/use-cases/gestao-inscricao/gestao-inscricao-usecase';
import { FiltroInscricaoRequest } from '../../../../../core/application/dto/request/inscricoes-pendentes-request.dto';

@Component({
  selector: 'app-obter-todas',
  standalone: false,
  templateUrl: './obter-todas.component.html',
  styleUrl: './obter-todas.component.scss',
})
export class ObterTodasComponent {
  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  liberacaoBotaoAprovar: boolean = false;
  participantesSelecionados: any[] = [];
  exibicaoListaParticipantes: boolean = false;
  inscricoes: PaginacaoResponse<GestaoInscricaoResponse>;

  constructor(private readonly gestaoInscricaoUseCase: GestaoInscricaoUseCase){}
  
    ngOnInit() {
      this.buscarInscricoes();
    }

    public buscarInscricoes(){
      const inscricoesRequest: FiltroInscricaoRequest = {            
            pagina: 1,
            tamanhoPagina: 20,
          };

         this.gestaoInscricaoUseCase.executeTodas(inscricoesRequest).subscribe({
      next: (resultado) => {
         if (resultado != null) {
          this.exibicaoListaParticipantes = true;
        } else {
          this.exibicaoListaParticipantes = false;
        }

        this.inscricoes = resultado;
      }
    });
    }
}
