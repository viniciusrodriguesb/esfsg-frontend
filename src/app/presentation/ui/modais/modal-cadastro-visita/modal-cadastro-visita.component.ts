import { Component, Inject, inject } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { CoresVisitaEnum } from '../../../../core/domain/enums/cores-visita.enum';
import { CriarVisitaUseCase } from '../../../../core/application/use-cases/visita/criar-visita.usecase';
import { CriarVisitaRequestDto } from '../../../../core/application/dto/request/criar-visita-request.dto';
import { DadoParticipanteDto } from '../../../../core/application/dto/response/validacao-checkin-response.dto';
import { VisitaResponseDto } from '../../../../core/application/dto/response/visita-response.dto';
import { EditarVisitaUseCase } from '../../../../core/application/use-cases/visita/editar-visita.usecase';
import { EditarVisitaRequestDto } from '../../../../core/application/dto/request/editar-visita-request.dto';
import { NotificacaoService } from '../../../../infrastructure/services/notificacao.service';

@Component({
  selector: 'app-modal-cadastro-visita',
  standalone: false,
  templateUrl: './modal-cadastro-visita.component.html',
  styleUrl: './modal-cadastro-visita.component.scss',
})
export class ModalCadastroVisitaComponent {
  private readonly _formBuilder = inject(FormBuilder);

  opcoesCoresSelect: TabelaDominioResponseDto[] = this.criarOpcoesSelectCores();

  formCadastroVisita = this._formBuilder.group({
    observacoes: ['', Validators.maxLength(500)],
    endereco: ['', Validators.required],
    idCor: [0, [Validators.required, this.corDiferenteDeZeroValidator]],
    descricao: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    private readonly dialog: MatDialog,
    private readonly criarVisitaUseCase: CriarVisitaUseCase,
    private readonly editarVisitaUseCase: EditarVisitaUseCase,
    private readonly notificacaoService: NotificacaoService,
    @Inject(MAT_DIALOG_DATA)
    public data: { dadosVisita: VisitaResponseDto }
  ) {}

  ngOnInit() {
    this.iniciarForm();
  }

  iniciarForm() {
    if (this.data?.dadosVisita != null) {
      this.formCadastroVisita.patchValue({
        observacoes: this.data.dadosVisita.observacao,
        endereco: this.data.dadosVisita.endereco,
        idCor: this.criarOpcoesSelectCores().find(
          (cor) => cor.descricao === this.data.dadosVisita.cor
        )?.id,
        descricao: this.data.dadosVisita.nome,
      });
    }
  }

  fecharModal() {
    this.dialog.closeAll();
  }

  criarOpcoesSelectCores(): TabelaDominioResponseDto[] {
    let array: TabelaDominioResponseDto[] = [{ id: 0, descricao: 'Selecione' }];
    Object.entries(CoresVisitaEnum).forEach(([key, value], index) => {
      array.push(new TabelaDominioResponseDto(index + 1, value));
    });

    return array;
  }

  editarVisita() {
    if (this.formCadastroVisita.valid) {
      const visitaData = this.formCadastroVisita.value;

      let payload: EditarVisitaRequestDto = {
        id: this.data.dadosVisita.id,
        descricao: visitaData.descricao,
        enderecoVisitado: visitaData.endereco,
        corVoluntario: this.criarOpcoesSelectCores().find(
          (cor) => cor.id == visitaData.idCor
        )?.descricao,
        observacoes: visitaData.observacoes,
      };
      this.editarVisitaUseCase.execute(payload).subscribe({
        next: () => {
          this.fecharModal();
          this.notificacaoService.sucesso(
            'Sucesso',
            'Visita editada com sucesso.'
          );
        },
        error: (error) => {
          this.notificacaoService.erro(
            'Erro',
            'Ocorreu um erro ao tentar editar a visita.'
          );
        },
      });
    }
  }

  cadastrarVisita() {
    if (this.formCadastroVisita.valid) {
      const visitaData = this.formCadastroVisita.value;

      let payload: CriarVisitaRequestDto = {
        descricao: visitaData.descricao,
        endereco: visitaData.endereco,
        cor: this.criarOpcoesSelectCores().find(
          (cor) => cor.id == visitaData.idCor
        )?.descricao,
        observacoes: visitaData.observacoes,
      };
      this.criarVisitaUseCase.execute(payload).subscribe({
        next: () => {
          this.fecharModal();
          this.notificacaoService.sucesso(
            'Sucesso',
            'Visita cadastrada com sucesso.'
          );
        },
        error: (error) => {
          this.notificacaoService.erro(
            'Erro',
            'Ocorreu um erro ao tentar cadastrar a visita.'
          );
        },
      });
    }
  }

  corDiferenteDeZeroValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value == 0 ? { corInvalida: true } : null;
  }
}
