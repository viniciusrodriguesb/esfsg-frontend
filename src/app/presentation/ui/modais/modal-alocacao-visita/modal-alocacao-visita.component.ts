import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InscritoVisitaResponseDto } from '../../../../core/application/dto/response/incritos-visita-response.dto';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BuscarFuncoesVisitaUseCase } from '../../../../core/application/use-cases/visita/buscar-funcoes-visita.usecase';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarVisitaUseCase } from '../../../../core/application/use-cases/visita/buscar-visita.usecase';
import { NotificacaoService } from '../../../../infrastructure/notificacao.service';

@Component({
  selector: 'app-modal-alocacao-visita',
  standalone: false,
  templateUrl: './modal-alocacao-visita.component.html',
  styleUrl: './modal-alocacao-visita.component.scss',
})
export class ModalAlocacaoVisitaComponent {
  private readonly _formBuilder = inject(FormBuilder);

  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { dadosVisita: InscritoVisitaResponseDto[] },
    private readonly buscarFuncoesVisitaUseCase: BuscarFuncoesVisitaUseCase,
    private readonly buscarVisitaUseCase: BuscarVisitaUseCase,
    private readonly notificacaoService: NotificacaoService
  ) {}

  funcoesVisitaSelect: TabelaDominioResponseDto[] = [];
  visitaSelect: TabelaDominioResponseDto[] = [];
  formAlocacao = this._formBuilder.group({
    alocacoes: this._formBuilder.array([]),
  });

  liberacaoBotaoConfirmar = false;

  ngOnInit() {
    this.buscarFuncoesVisita();
    this.buscarVisitas();
    this.criarFormAlocacoes();
  }

  private criarFormAlocacoes() {
    const alocacoesArray = this.formAlocacao.get('alocacoes') as FormArray;
    this.data.dadosVisita.forEach((item) => {
      const grupo = this._formBuilder.group({
        idInscricao: [item.idInscricao, Validators.required],
        funcaoVisita: ['', Validators.required],
        visita: ['', Validators.required],
      });

      alocacoesArray.push(grupo);
    });
  }

  get alocacoes(): FormArray {
    return this.formAlocacao.get('alocacoes') as FormArray;
  }

  getAlocacaoControl(index: number, controlName: string) {
    return this.alocacoes.at(index).get(controlName) as FormControl;
  }

  private buscarVisitas() {
    this.buscarVisitaUseCase.execute().subscribe({
      next: (resultado) => {
        this.visitaSelect = resultado.map((visita) => {
          return {
            id: visita.id,
            descricao: visita.nome,
          };
        });
      },
      error: (error) => {
        console.error('Erro ao buscar visitas:', error);
      },
    });
  }

  private buscarFuncoesVisita() {
    this.buscarFuncoesVisitaUseCase.execute().subscribe({
      next: (eventos) => {
        this.funcoesVisitaSelect = eventos;
      },
      error: (error) => {
        console.error('Erro ao buscar eventos:', error);
      },
    });
  }
  private liberarBotaoConfirmar() {
    if (this.formAlocacao.valid) {
      this.liberacaoBotaoConfirmar = true;
    }
  }

  public confirmarAlocacao() {
    this.notificacaoService.sucesso(
      'Confirmado',
      'Incritos alocados com sucesso!'
    );
    console.log('Formulário de alocação:', this.formAlocacao.value);
  }

  public selecionarVisita(visita: any) {
    console.log('Formulário de alocação:', this.formAlocacao.value);
    console.log('Visita selecionada:', this.formAlocacao.valid);
    this.liberarBotaoConfirmar();
  }

  fecharModal() {
    this.dialog.closeAll();
  }
}
