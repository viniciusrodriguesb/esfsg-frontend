import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { TipoUsuarioEnum } from '../../../../core/domain/enums/tipo-usuario.enum';
import { AlterarRoleUsuarioUseCase } from '../../../../core/application/use-cases/gestao-usuario/alterar-role-usuario.usecase';
import { AlterarRoleUsuarioRequest } from '../../../../core/application/dto/request/alterar-role-usuario-request.dto';
import { NotificacaoService } from '../../../../infrastructure/services/notificacao.service';

@Component({
  selector: 'app-modal-permissao-usuario',
  standalone: false,
  templateUrl: './modal-permissao-usuario.component.html',
  styleUrl: './modal-permissao-usuario.component.scss',
})
export class ModalPermissaoUsuarioComponent {
  private readonly _formBuilder = inject(FormBuilder);

  opcoesSelect: TabelaDominioResponseDto[] = [];

  formPermissao = this._formBuilder.group({
    role: [0, Validators.required],
  });
  //TODO: validar se o select esta marcado com o 'selecione' + catch no subscribe

  constructor(
    private readonly dialogRef: MatDialogRef<ModalPermissaoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { permissaoUsuario: string; idUsuario: number },
    private readonly alterarRoleUsuarioUseCase: AlterarRoleUsuarioUseCase,
    private readonly notificacaoService: NotificacaoService,
  ) {}

  fecharModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.formPermissao.patchValue({
      role: this.preencherOpcoesSelect().find(
        (role) => role.descricao == this.data.permissaoUsuario
      ).id || 0,
    });
  }

  preencherOpcoesSelect(): TabelaDominioResponseDto[] {
    let array: TabelaDominioResponseDto[] = [{ id: null, descricao: 'Selecione' }];
    let arrayNormal = Object.entries(TipoUsuarioEnum).length / 2;

    for (let i = 0; i < arrayNormal; i++) {
      array.push(
        new TabelaDominioResponseDto(
          Number.parseInt(Object.entries(TipoUsuarioEnum)[i][0]),
          Object.entries(TipoUsuarioEnum)[i][1].toString()
        )
      );
    }
    return array;
  }

  editarPermissaoUsuario() {
    let request: AlterarRoleUsuarioRequest = new AlterarRoleUsuarioRequest();
    request.idUsuario = this.data.idUsuario;
    request.tipoUsuario = Number.parseInt(
      this.formPermissao.get('role').value.toString()
    );

    this.alterarRoleUsuarioUseCase.execute(request).subscribe({
      next: (resp) => {
        this.notificacaoService.sucesso('Sucesso', 'Permissão alterada com sucesso!');
        this.fecharModal();
      },
    });
  }
}
