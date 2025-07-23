import { Component, inject, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { CheckinResponseDto } from '../../../../core/application/dto/response/checkin-response-response.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { FiltroCheckinComponent } from '../filtro-checkin/filtro-checkin.component';
import { BuscarClasseUseCase } from '../../../../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarIgrejaUseCase } from '../../../../core/application/use-cases/igreja/buscar-classe.usecase';
import { TipoUsuarioEnum } from '../../../../core/domain/enums/tipo-usuario.enum';

@Component({
  selector: 'app-filtro-gestao-usuario',
  standalone: false,
  templateUrl: './filtro-gestao-usuario.component.html',
  styleUrl: './filtro-gestao-usuario.component.scss',
})
export class FiltroGestaoUsuarioComponent {
  private readonly _bottomSheetRef =
    inject<MatBottomSheetRef<FiltroCheckinComponent>>(MatBottomSheetRef);
  private readonly _formBuilder = inject(FormBuilder);


  classes: TabelaDominioResponseDto[] = [];
  igrejas: TabelaDominioResponseDto[] = [];

  formFiltroUsuario = this._formBuilder.group({
    nome: [''],
    tipoUsuario: [''],
    idIgreja: [''],
    idClasse: [''],
    cpf: [''],
  });

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      idEvento: number;
      ultimoFiltro: Partial<{
        nome: string;
        idIgreja: string;
        idClasse: string;
        cpf: string;
        tipoUsuario: string;
      }>;
    },
    private readonly buscarClasseUsecase: BuscarClasseUseCase,
    private readonly buscarIgrejaUsecase: BuscarIgrejaUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.buscarClasse();
    this.buscarIgrejas();
    this.preencherFiltroAnterior();
  }

  fechar(): void {
    this._bottomSheetRef.dismiss();
  }

  enviarFiltro() {
    this._bottomSheetRef.dismiss(this.formFiltroUsuario.value);
  }

  preencherFiltroAnterior() {
    this.formFiltroUsuario.patchValue(this.data.ultimoFiltro);
  }

  limparFiltro() {
    this.formFiltroUsuario.reset();
    this._bottomSheetRef.dismiss(this.formFiltroUsuario.value);
  }

  public buscarClasse() {
    this.buscarClasseUsecase.execute().subscribe({
      next: (resultado) => {
        this.classes = resultado.map((classe) => ({
          id: classe.id,
          descricao: this.nomePipe.transform(classe.descricao),
        }));

        this.classes.unshift(new TabelaDominioResponseDto(null, 'Selecione'));
      },
      error: (error) => {},
    });
  }

  public buscarIgrejas() {
    this.buscarIgrejaUsecase.execute().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.igrejas = resultado.map((igreja) => ({
            id: igreja.id,
            descricao: this.nomePipe.transform(igreja.descricao),
          }));

          this.igrejas.unshift(new TabelaDominioResponseDto(null, 'Selecione'));
        }
      },
      error: (erro) => {},
    });
  }

  mapearEnumParaSelect(): TabelaDominioResponseDto[] {
    let lista = Object.keys(TipoUsuarioEnum)
      .filter((key) => !isNaN(Number(TipoUsuarioEnum[key as any]))) // Filtra apenas as chaves numéricas
      .map((key) => {
        const id = TipoUsuarioEnum[key as keyof typeof TipoUsuarioEnum];
        const descricao = this.formatarDescricao(key);
        return new TabelaDominioResponseDto(id, descricao);
      });

    lista.unshift(new TabelaDominioResponseDto(null, 'Selecione'));

    return lista;
  }

  formatarDescricao(nome: string): string {
    return nome
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  }
}
