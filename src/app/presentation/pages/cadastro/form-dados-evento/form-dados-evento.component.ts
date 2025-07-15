import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscricaoRequestDto } from '../../../../core/application/dto/request/inscricao-request.dto';
import { TabelaDominioResponseDto } from '../../../../core/application/dto/response/tabela-dominio-response.dto';
import { BuscarFuncaoEventoUseCase } from '../../../../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { ParametroStorageEnum } from '../../../../core/domain/enums/parametro-storage.enum';
import { PeriodoEnum } from '../../../../core/domain/enums/periodo.enum';
import { Rotas } from '../../../../core/domain/enums/rotas.enum';
import { NomePipe } from '../../../pipes/nome.pipe';
import { ResumoInscricaoDto } from '../../../../core/application/dto/resumo-inscricao.dto';
import { UsuarioResponseDto } from '../../../../core/application/dto/response/usuario-response.dto';
import { BuscarPeriodoEventoUseCase } from '../../../../core/application/use-cases/evento/buscar-periodo-evento.usecase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-dados-evento',
  standalone: false,
  templateUrl: './form-dados-evento.component.html',
  styleUrl: './form-dados-evento.component.scss',
})
export class FormDadosEventoComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formDadosEvento = this._formBuilder.group({
    funcaoEvento: ['', Validators.required],
    periodo: ['', Validators.required],
    visitas: [''],
    carro: [''],
    quantidadeVagas: [''],
  });

  
  opcoesBooleanas: TabelaDominioResponseDto[] = [
    { id: 1, descricao: 'Sim' },
    { id: 2, descricao: 'Não' },
  ];
  opcoesFuncaoEvento: TabelaDominioResponseDto[] = [];
  periodos: TabelaDominioResponseDto[] = [
    { id: 1, descricao: PeriodoEnum.Tarde },
    { id: 2, descricao: PeriodoEnum.Integral },
  ];

  exibeInfoVisita = false;
  exibeVisita = false;
  inscricaoUsuario: InscricaoRequestDto;
  resumoInscricao: ResumoInscricaoDto;
  usuarioExistente: UsuarioResponseDto;

  constructor(
    private readonly router: Router,
    private readonly buscarFuncaoEventoUsecase: BuscarFuncaoEventoUseCase,
    private readonly buscarPeriodoEventoUsecase: BuscarPeriodoEventoUseCase,
    private readonly nomePipe: NomePipe
  ) {}

  ngOnInit() {
    this.inscricaoUsuario = JSON.parse(localStorage.getItem(ParametroStorageEnum.FORM_INSCRICAO)) as InscricaoRequestDto;
    this.resumoInscricao = JSON.parse(localStorage.getItem(ParametroStorageEnum.RESUMO_INSCRICAO)) as ResumoInscricaoDto;
    this.usuarioExistente = JSON.parse(localStorage.getItem(ParametroStorageEnum.USUARIO_EXISTENTE)) as UsuarioResponseDto;

    if (this.inscricaoUsuario) {
      this.preencherFormulario(this.inscricaoUsuario);
    }

    this.buscarFuncaoEvento();
    this.buscarPeriodoEvento();
  }

  private buscarPeriodoEvento() {
    this.buscarPeriodoEventoUsecase.execute(this.inscricaoUsuario.idEvento).subscribe({
      next: (resultado) => {
        if(resultado.length <= 0){
            Swal.fire({
            icon: 'error',
            title: 'Atenção',
            text: `O limite de participantes no evento foi atingido!`,
            confirmButtonText: 'Ok',
            customClass: {
              title: 'swal-title',
              confirmButton: 'swal-confirm-btn',
              popup: 'swal-popup',
            },
            buttonsStyling: false,
          }).then((result) => {
              this.router.navigate([Rotas.ESCOLHA_INICIAL]);            
          });
        }
        let array = [];
        resultado.forEach((valor, index) =>{
          array.push({ id: index + 1, descricao: valor });
        })
        this.periodos = array;
      },
      error: () => {},
    });
  }

  private preencherObjetoInscricao() {
    const formValue = this.formDadosEvento.value;

    this.inscricaoUsuario = {
      ...this.inscricaoUsuario,
      idFuncaoEvento: parseInt(formValue.funcaoEvento ?? ''),
      periodo: formValue.periodo == '1' ? 'Integral' : 'Tarde',
      visita: {
        visita: formValue.visitas == '1',
        carro: formValue.carro == '1',
        vagas: parseInt(formValue.quantidadeVagas ?? ''),
      },
    };
  }

  private preencherObjetoResumoInscricao() {    
    this.resumoInscricao.evento.periodo =
      this.formDadosEvento.get('periodo')?.value == '1'
        ? 'Integral'
        : 'Tarde';
    this.resumoInscricao.evento.funcao =
      this.opcoesFuncaoEvento.find(
        (f) =>
          f.id === parseInt(this.formDadosEvento.get('funcaoEvento')?.value)
      )?.descricao || '';
    this.resumoInscricao.visita.visita =
      this.formDadosEvento.get('visitas')?.value === '1' ? 'Sim' : 'Não';
    this.resumoInscricao.visita.carro =
      this.formDadosEvento.get('carro')?.value === '1' ? 'Sim' : 'Não';
    this.resumoInscricao.visita.vagas =
      parseInt(this.formDadosEvento.get('quantidadeVagas')?.value) || 0;

    localStorage.setItem(ParametroStorageEnum.RESUMO_INSCRICAO,JSON.stringify(this.resumoInscricao));
  }

  preencherFormulario(dados: InscricaoRequestDto): void {
    this.formDadosEvento.patchValue({
      funcaoEvento: dados.idFuncaoEvento?.toString() == '0' ? null : dados.idFuncaoEvento?.toString(),
      periodo: dados.periodo == PeriodoEnum.Integral ? '1' : '2',
      visitas: dados.visita?.visita ? '1' : '2',
      carro: dados.visita?.carro ? '1' : '2',
      quantidadeVagas: dados.visita?.vagas?.toString() || '',
    });

    if (this.formDadosEvento.get('visitas')?.value === '1') {
      this.exibeInfoVisita = true;
    }
  }

  public exibirVisita(evento: any){
      if(evento == 1){
        this.exibeVisita = true;
      }else{
        this.exibeVisita = false;
      }
  }

  public exibirCamposVisita(evento: any) { 
    if (evento == 1) {
      this.exibeInfoVisita = true;
    } else {
      this.formDadosEvento.patchValue({
        carro: '',
        quantidadeVagas: '',
      });
      this.exibeInfoVisita = false;
    }
  }

  public buscarFuncaoEvento() {
    this.buscarFuncaoEventoUsecase.execute(this.inscricaoUsuario.idEvento).subscribe({
        next: (resultado) => {
          this.opcoesFuncaoEvento = [{ id: null, descricao: 'Selecione' }];
          this.opcoesFuncaoEvento.push(...this.formatarNomes(resultado));
        },
        error: () => {},
      });
  }

  prosseguir() {
    this.preencherObjetoResumoInscricao();
    this.preencherObjetoInscricao();

    localStorage.setItem(ParametroStorageEnum.FORM_INSCRICAO, JSON.stringify(this.inscricaoUsuario));

    if (this.usuarioExistente?.cpf != null) {
      this.router.navigate([Rotas.CADASTRO, Rotas.CONFIRMACAO_DADOS_CADASTRO]);
    } else {
      this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_ADICIONAIS]);
    }
  }

  voltar() {
    this.router.navigate([Rotas.CADASTRO, Rotas.FORM_DADOS_IGREJA]);
  }

  private formatarNomes(
    nomes: TabelaDominioResponseDto[]
  ): TabelaDominioResponseDto[] {
    return nomes.map((nome) => ({
      ...nome,
      descricao: this.nomePipe.transform(nome.descricao),
    }));
  }
}
