import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { AnimationOptions } from 'ngx-lottie';
import { BuscarParticipantesCheckinUseCase } from '../../../../core/application/use-cases/checkin/buscar-participantes-checkin.usecase';
import { CheckinRequestDto } from '../../../../core/application/dto/request/checkin-request.dto';
import { CheckinResponseDto } from '../../../../core/application/dto/response/checkin-response-response.dto';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalQrcodeCheckinComponent } from '../../../ui/modais/modal-qrcode-checkin/modal-qrcode-checkin.component';
import { ModalCheckinConfirmadoComponent } from '../../../ui/modais/modal-checkin-confirmado/modal-checkin-confirmado.component';

@Component({
  selector: 'app-check-in',
  standalone: false,
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
})
export class CheckInComponent {
  private readonly _formBuilder = inject(FormBuilder);

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

  formCheckin = this._formBuilder.group({
    funcaoEvento: [''],
    periodo: [''],
    nome: [''],
  });

  periodos: TabelaDominioResponseDto[] = [
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];

  checkin: CheckinResponseDto;
  exibicaoListaParticipantes: boolean = false;
  listaParticipantes: any[] = [1];

  constructor(
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly buscarParticipantesCheckinUsecase: BuscarParticipantesCheckinUseCase,
    private readonly nomePipe: NomePipe,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarFuncaoEvento();
    this.buscarParticipantesCheckin();
  }

  public buscarParticipantesCheckin() {
    const checkinRequest: CheckinRequestDto = {
      funcaoEvento: this.formCheckin.get('funcaoEvento')?.value
        ? [Number.parseInt(this.formCheckin.get('funcaoEvento')?.value)]
        : undefined,
      periodo: this.formCheckin.get('periodo')?.value,
      nome: this.formCheckin.get('nome')?.value,
      pagina: 0,
      tamanhoPagina: 6,
    };

    this.buscarParticipantesCheckinUsecase.execute(checkinRequest).subscribe({
      next: (resultado) => {
        console.log('resultado', resultado);

        if (resultado != null) {
          this.exibicaoListaParticipantes = true;
        } else {
          console.log('nenhum participante encontrado');

          this.exibicaoListaParticipantes = false;
        }

        this.checkin = resultado;
      },
      error: (error) => {
        console.log('entrou');

        this.exibicaoListaParticipantes = false;
      },
    });
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(1).subscribe({
      next: (resultado) => {
        this.opcoesFuncaoEvento = this.formatarNomes(resultado);
      },
      error: () => {},
    });
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }

  public validarCheckin() {
    if (this.listaParticipantes.length > 1) {
      this.abrirModalConfirmacaoSucesso();
    } else {
      this.abrirScanner();
    }
  }

  abrirModalConfirmacaoSucesso() {
    const dialogRef = this.dialog.open(ModalCheckinConfirmadoComponent, {
      width: '90%',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('QR Code lido:', result);
        // Faça algo com o resultado
        alert(`QR Code lido: $ {result}`);
      }
    });
  }

  abrirScanner() {
    const dialogRef = this.dialog.open(ModalQrcodeCheckinComponent, {
      width: '90%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('QR Code lido:', result);
        // Faça algo com o resultado
        alert(`QR Code lido: $ {result}`);
      }
    });
  }
}
