import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioResponseDto } from '../../../../core/application/dto/response/usuario-response.dto';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarIgrejaUseCase } from '../../../../core/application/use-cases/igreja/buscar-classe.usecase';
import { NomePipe } from '../../../pipes/nome.pipe';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';

@Component({
  selector: 'app-modal-edicao-usuario',
  standalone: false,
  templateUrl: './modal-edicao-usuario.component.html',
  styleUrl: './modal-edicao-usuario.component.scss',
})
export class ModalEdicaoUsuarioComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formEdicao = this._formBuilder.group({
    cpf: [''],
    nomeCompleto: [''],
    telefone: [''],
    nascimento: [''],
    email: [''],
    possuiDons: [0],
    pcd: [''],
    igreja:[0],
    classe: [0]
  });

  formSubmetido = false;

  opcoesBooleanas: TabelaDominioResponseDto[] = [
    { id: 1, descricao: 'Sim' },
    { id: 2, descricao: 'Não' },
  ];
  classes: TabelaDominioResponseDto[] = [];
  igrejas: TabelaDominioResponseDto[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly buscarIgrejaUsecase: BuscarIgrejaUseCase,
    private readonly buscarClasseUsecase: BuscarClasseUseCase,
    private readonly nomeFormatadoPipe: NomePipe,
    @Inject(MAT_DIALOG_DATA) public data: { dadosUsuario: UsuarioResponseDto }
  ) {}

  ngOnInit() {
    this.buscarIgrejas();
    this.buscarClasse();
    this.inicializarFormulario();
  }

  editarDadosUsuario(){
    
  }

  public buscarClasse() {
    this.buscarClasseUsecase.execute().subscribe({
      next: (classes) => {
        this.classes = classes.map((classe) => ({
          id: classe.id,
          descricao: this.nomeFormatadoPipe.transform(classe.descricao),
        }));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public buscarIgrejas() {
    this.buscarIgrejaUsecase.execute().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.igrejas = resposta.map((igreja) => ({
            id: igreja.id,
            descricao: this.nomeFormatadoPipe.transform(igreja.descricao),
          }));
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar igrejas:', erro);
      },
    });
  }

  private inicializarFormulario() {
    this.formEdicao.get('cpf').disable();
    this.formEdicao.patchValue({
      cpf: this.data.dadosUsuario.cpf,
      nomeCompleto: this.data.dadosUsuario.nomeCompleto,
      telefone: this.data.dadosUsuario.telefone,
      nascimento: this.data.dadosUsuario.nascimento,
      email: this.data.dadosUsuario.email,
      possuiDons: this.data.dadosUsuario.possuiDons ? 1 : 2,
      pcd: this.data.dadosUsuario.pcd,
      igreja: this.data.dadosUsuario.igreja?.id || 0,
      classe: this.data.dadosUsuario.classe?.id || 0,
    });
  }

  fecharModal() {
    this.dialog.closeAll();
  }

  dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
    const dataStr = control.value;

    if (!dataStr || dataStr.length !== 8) {
      return { dataInvalida: 'Data deve ter 8 dígitos no formato ddMMyyyy' };
    }

    const dia = Number(dataStr.substring(0, 2));
    const mes = Number(dataStr.substring(2, 4));
    const ano = Number(dataStr.substring(4, 8));

    // Verifica se os valores são números válidos
    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
      return { dataInvalida: 'Data contém valores inválidos' };
    }

    const data = new Date(ano, mes - 1, dia);

    // Verifica se a data construída bate com os valores (exemplo: 31/02/2020 é inválido)
    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    ) {
      return { dataInvalida: 'Data inválida' };
    }

    // Data mínima e máxima
    const dataMinima = new Date(1900, 0, 1);
    const dataMaxima = new Date();
    dataMaxima.setHours(0, 0, 0, 0); // só data, sem hora

    if (data < dataMinima) {
      return { dataInvalida: 'Data menor que 01/01/1900' };
    }

    if (data > dataMaxima) {
      return { dataInvalida: 'Data maior que hoje' };
    }

    return null;
  }
}
