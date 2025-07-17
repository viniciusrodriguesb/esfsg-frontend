import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';
import Swal from 'sweetalert2';

import { BuscarVisitaUseCase } from '../../../../../core/application/use-cases/visita/buscar-visita.usecase';
import { VisitaResponseDto } from '../../../../../core/application/dto/response/visita-response.dto';
import { ModalCadastroVisitaComponent } from '../../../../ui/modais/modal-cadastro-visita/modal-cadastro-visita.component';
import { DeletarVisitaUseCase } from '../../../../../core/application/use-cases/visita/deletar-visita.usecase';
import { NotificacaoService } from '../../../../../infrastructure/services/notificacao.service';

@Component({
  selector: 'app-crud-visita',
  standalone: false,
  templateUrl: './crud-visita.component.html',
  styleUrl: './crud-visita.component.scss',
})
export class CrudVisitaComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formVisita = this._formBuilder.group({
    nome: [''],
  });

  options: AnimationOptions = {
    path: '/animations/animation-check-in.json',
    renderer: 'svg',
    loop: true,
  };

  animacaoErro: AnimationOptions = {
    path: '/animations/animation-not-found.json',
    renderer: 'svg',
    loop: false,
  };

  exibicaoListaVisitas: boolean = false;

  visitas: VisitaResponseDto[] = [];

  constructor(
    private readonly buscarVisitaUseCase: BuscarVisitaUseCase,
    private readonly deletarVisitaUsecase: DeletarVisitaUseCase,
    private readonly notificacaoService: NotificacaoService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarVisitas();
  }

  public buscarVisitas() {
    this.buscarVisitaUseCase.execute(this.formVisita.get('nome').value).subscribe({
      next: (resultado) => {
        if (resultado != null && resultado.length > 0) {
          this.exibicaoListaVisitas = true;
        } else {
          this.exibicaoListaVisitas = false;
        }

        this.visitas = resultado;
      },
      error: (error) => {
      },
    });
  }

  abrirModalCadastroEdicaoVisita(visita: VisitaResponseDto | null) {
    const dialogRef = this.dialog.open(ModalCadastroVisitaComponent, {
      width: '90%',
      height: 'auto',
      data: {
        dadosVisita: visita,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.buscarVisitas();
    });
  }

  abrirModalConfirmacao(idVisita: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmação',
      text: 'Você tem certeza que deseja excluir esta visita?',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      customClass: {
        title: 'swal-title',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
        popup: 'swal-popup',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletarVisita(idVisita);
      }
    });
  }

  deletarVisita(idVisita: number) {
    this.deletarVisitaUsecase.execute(idVisita).subscribe({
      next: () => {
        this.notificacaoService.sucesso(
          'Sucesso',
          'Visita excluída com sucesso.'
        );
        this.buscarVisitas();
      },
      error: (error) => {
        this.notificacaoService.erro(
          'Erro',
          'Ocorreu um erro ao tentar excluir a visita.'
        );
      },
    });
  }
}
