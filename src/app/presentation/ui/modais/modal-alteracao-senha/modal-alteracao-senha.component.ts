import { Component, inject, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlterarRoleUsuarioRequest } from '../../../../core/application/dto/request/alterar-role-usuario-request.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { NotificacaoService } from '../../../../infrastructure/services/notificacao.service';
import { AlterarSenhaUsuarioUseCase } from '../../../../core/application/use-cases/gestao-usuario/alterar-senha-usuario.usecase';
import { AlterarSenhaUsuarioRequest } from '../../../../core/application/dto/request/alterar-senha-usuario-request.dto';

@Component({
  selector: 'app-modal-alteracao-senha',
  standalone: false,
  templateUrl: './modal-alteracao-senha.component.html',
  styleUrl: './modal-alteracao-senha.component.scss'
})
export class ModalAlteracaoSenhaComponent  {
  private readonly _formBuilder = inject(FormBuilder);

  opcoesSelect: TabelaDominioResponseDto[] = [];
  validacaoSenha: boolean = true;

  formSenha = this._formBuilder.group({
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmacao: ['', [Validators.required, Validators.minLength(8)], ],
  },{validators: this.senhasCompativeisValidator()});

  constructor(
    private readonly dialogRef: MatDialogRef<ModalAlteracaoSenhaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { permissaoUsuario: string; idUsuario: number },
    private readonly alterarSenhaUsuarioUseCase: AlterarSenhaUsuarioUseCase,
    private readonly notificacaoService: NotificacaoService,
  ) {}

  fecharModal() {
    this.dialogRef.close();
  }


  senhasCompativeisValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const senha = formGroup.get('senha')?.value;
      const confirmacao = formGroup.get('confirmacao')?.value;
  
      if (senha && confirmacao && senha !== confirmacao) {
        return { senhasDiferentes: true };
      }
      return null;
    };
  }

  editarSenhaUsuario() {
    let request: AlterarSenhaUsuarioRequest = new AlterarSenhaUsuarioRequest();
    request.idUsuario = this.data.idUsuario;
    request.senha =  this.formSenha.get('senha').value

    this.alterarSenhaUsuarioUseCase.execute(request).subscribe({
      next: (resp) => {
        this.notificacaoService.sucesso('Sucesso', 'Senha alterada com sucesso!');
        this.fecharModal();
      },
    });
  }
}
