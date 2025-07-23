import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AnimationOptions } from 'ngx-lottie';
import { DadoParticipanteDto } from '../../../../core/application/dto/response/validacao-checkin-response.dto';
import { NomePipe } from '../../../pipes/nome.pipe';
import { ModalCheckinConfirmadoComponent } from '../../../ui/modais/modal-checkin-confirmado/modal-checkin-confirmado.component';
import { BuscarUsuarioUseCase } from '../../../../core/application/use-cases/gestao-usuario/buscar-usuario.usecase';
import { BuscarUsuariosRequest } from '../../../../core/application/dto/request/buscar-usuarios-request.dto';
import { BuscarUsuarioResponseDto } from '../../../../core/application/dto/response/buscar-usuarios-response.dto';
import { PaginacaoResponse } from '../../../../core/application/dto/response/paginacao-response.dto';
import { FiltroGestaoUsuarioComponent } from '../../../ui/filtros/filtro-gestao-usuario/filtro-gestao-usuario.component';

@Component({
  selector: 'app-gestao-usuario',
  standalone: false,
  templateUrl: './gestao-usuario.component.html',
  styleUrl: './gestao-usuario.component.scss',
})
export class GestaoUsuarioComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _bottomSheet = inject(MatBottomSheet);

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

  formFiltroUsuario = this._formBuilder.group({
    nome: [''],
    idIgreja: [''],
    idClasse: [''],
    cpf: [''],
    tipoUsuario: [''],
  });

  usuarios: PaginacaoResponse<BuscarUsuarioResponseDto>;
  exibicaoListaUsuarios: boolean = false;
  pageEvent: PageEvent;
  filtroUsuarioRequest: BuscarUsuariosRequest = new BuscarUsuariosRequest();

  constructor(
    private readonly buscarUsuariosUseCase: BuscarUsuarioUseCase,
    private readonly nomePipe: NomePipe,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarUsuarios();
  }

  public buscarUsuarios(paginacao?: PageEvent) {
    let request: BuscarUsuariosRequest = {
      idIgreja:
        Number.parseInt(this.formFiltroUsuario.get('idIgreja')?.value) || null,
      idClasse:
        Number.parseInt(this.formFiltroUsuario.get('idClasse')?.value) || null,
      cpf: this.formFiltroUsuario.get('cpf')?.value || null,
      tipoUsuario:
        Number.parseInt(this.formFiltroUsuario.get('tipoUsuario')?.value) ||
        null,
      nome: this.formFiltroUsuario.get('nome')?.value || null,
      pagina: paginacao?.pageIndex + 1 || 1,
      tamanhoPagina: paginacao?.pageSize || 10,
    };

    request = this.substituirStringsVaziasPorNull(request);

    this.buscarUsuariosUseCase.execute(request).subscribe({
      next: (resultado) => {
        if (resultado != null && resultado.itens.length > 0) {
          this.exibicaoListaUsuarios = true;
        } else {
          this.exibicaoListaUsuarios = false;
        }

        this.usuarios = resultado;
      },
      error: (error) => {
        this.exibicaoListaUsuarios = false;
      },
    });
    return paginacao;
  }

  private substituirStringsVaziasPorNull(obj: any): any {
    const novoObj: any = {};

    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const valor = obj[key];
        console.log('valor', valor, key);

        novoObj[key] = valor == '' || valor == undefined ? null : valor;
      }
    }

    return novoObj;
  }

  abrirModalConfirmacaoSucesso(resultadoValidacao: DadoParticipanteDto[]) {
    const dialogRef = this.dialog.open(ModalCheckinConfirmadoComponent, {
      width: '90%',
      height: 'auto',
      data: {
        resultadoValidacao: resultadoValidacao,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.buscarUsuarios();
    });
  }

  abrirFiltro(): void {
    const bottomSheetRef = this._bottomSheet.open(
      FiltroGestaoUsuarioComponent,
      {
        hasBackdrop: true,
        data: {
          ultimoFiltro: this.formFiltroUsuario.value,
        },
      }
    );

    bottomSheetRef.afterDismissed().subscribe((teste) => {
      this.formFiltroUsuario.patchValue(teste);
      this.buscarUsuarios();
    });
  }
}
