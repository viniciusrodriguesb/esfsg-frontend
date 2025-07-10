import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../presentation/ui/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  constructor(private readonly snackBar: MatSnackBar) {}

  private abrirSnackbar(titulo: string, mensagem: string, tipo: 'success' | 'warning' | 'error') {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { titulo, mensagem, tipo },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top', 
      panelClass: [`${tipo}-snackbar`],
    });
  }

  sucesso(titulo: string, mensagem: string) {
    this.abrirSnackbar(titulo, mensagem, 'success');
  }

  alerta(titulo: string, mensagem: string) {
    this.abrirSnackbar(titulo, mensagem, 'warning');
  }

  erro(titulo: string = 'Erro', mensagem: string = 'Ocorreu um erro de serviço.') {
  this.abrirSnackbar(titulo, mensagem, 'error');
}
}