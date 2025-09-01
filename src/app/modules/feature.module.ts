import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from '../presentation/pages/cadastro/cadastro.component';
import { ConfirmacaoComponent } from '../presentation/pages/cadastro/confirmacao/confirmacao.component';
import { FormDadosAdicionaisComponent } from '../presentation/pages/cadastro/form-dados-adicionais/form-dados-adicionais.component';
import { FormDadosEventoComponent } from '../presentation/pages/cadastro/form-dados-evento/form-dados-evento.component';
import { FormDadosIgrejaComponent } from '../presentation/pages/cadastro/form-dados-igreja/form-dados-igreja.component';
import { FormDadosPessoaisComponent } from '../presentation/pages/cadastro/form-dados-pessoais/form-dados-pessoais.component';
import { FormInicialComponent } from '../presentation/pages/cadastro/form-inicial/form-inicial.component';
import { SucessoComponent } from '../presentation/pages/cadastro/sucesso/sucesso.component';
import { EscolhaInicialComponent } from '../presentation/pages/escolha-inicial/escolha-inicial.component';
import { CheckInComponent } from '../presentation/pages/home-logada/check-in/check-in.component';
import { DashboardInicialComponent } from '../presentation/pages/home-logada/dashboard-inicial/dashboard-inicial.component';
import { GestaoPagamentoComponent } from '../presentation/pages/home-logada/gestao-pagamento/gestao-pagamento.component';
import { GestaoUsuarioComponent } from '../presentation/pages/home-logada/gestao-usuario/gestao-usuario.component';
import { CrudVisitaComponent } from '../presentation/pages/home-logada/gestao-visitas/crud-visita/crud-visita.component';
import { GestaoVisitasComponent } from '../presentation/pages/home-logada/gestao-visitas/gestao-visitas.component';
import { VisitasAlocadasComponent } from '../presentation/pages/home-logada/gestao-visitas/visitas-alocadas/visitas-alocadas.component';
import { VisitasNaoAlocadasComponent } from '../presentation/pages/home-logada/gestao-visitas/visitas-nao-alocadas/visitas-nao-alocadas.component';
import { HomeLogadaComponent } from '../presentation/pages/home-logada/home-logada.component';
import { GestaoInscricaoComponent } from '../presentation/pages/home-logada/inscricao/gestao-inscricao.component';
import { ObterTodasComponent } from '../presentation/pages/home-logada/inscricao/obter-todas/obter-todas.component';
import { PendentesAprovacaoComponent } from '../presentation/pages/home-logada/inscricao/pendentes-aprovacao/pendentes-aprovacao.component';
import { RelatoriosComponent } from '../presentation/pages/home-logada/relatorios/relatorios.component';
import { FormAdminComponent } from '../presentation/pages/login/form-admin/form-admin.component';
import { FormUsuarioComponent } from '../presentation/pages/login/form-usuario/form-usuario.component';
import { LoginComponent } from '../presentation/pages/login/login.component';
import { PerfilComponent } from '../presentation/pages/perfil/perfil.component';
import { FiltroCheckinComponent } from '../presentation/ui/filtros/filtro-checkin/filtro-checkin.component';
import { FiltroGestaoUsuarioComponent } from '../presentation/ui/filtros/filtro-gestao-usuario/filtro-gestao-usuario.component';
import { ModalAlocacaoVisitaComponent } from '../presentation/ui/modais/modal-alocacao-visita/modal-alocacao-visita.component';
import { ModalCadastroVisitaComponent } from '../presentation/ui/modais/modal-cadastro-visita/modal-cadastro-visita.component';
import { ModalCheckinConfirmadoComponent } from '../presentation/ui/modais/modal-checkin-confirmado/modal-checkin-confirmado.component';
import { ModalEdicaoUsuarioComponent } from '../presentation/ui/modais/modal-edicao-usuario/modal-edicao-usuario.component';
import { ModalInfoInscricaoComponent } from '../presentation/ui/modais/modal-info-inscricao/modal-info-inscricao.component';
import { ModalInfoVisitaComponent } from '../presentation/ui/modais/modal-info-visita/modal-info-visita.component';
import { ModalPagamentoConfirmadoComponent } from '../presentation/ui/modais/modal-pagamento-confirmado/modal-pagamento-confirmado.component';
import { ModalParticipanteHorarioErradoComponent } from '../presentation/ui/modais/modal-participante-horario-errado/modal-participante-horario-errado.component';
import { ModalQrcodeCheckinComponent } from '../presentation/ui/modais/modal-qrcode-checkin/modal-qrcode-checkin.component';
import { BuscarParticipantesCheckinUseCase } from '../core/application/use-cases/checkin/buscar-participantes-checkin.usecase';
import { ValidarQrCodeParticipanteUseCase } from '../core/application/use-cases/checkin/validar-qrcode-participante.usecase';
import { BuscarClasseUseCase } from '../core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarCondicaoMedicaUseCase } from '../core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { DeletarCondicaoMedicaUseCase } from '../core/application/use-cases/condicao-medica/deletar-condicao-medica.usecase';
import { EditarCondicaoMedicaUseCase } from '../core/application/use-cases/condicao-medica/editar-condicao-medica.usecase';
import { InserirCondicaoMedicaUseCase } from '../core/application/use-cases/condicao-medica/inserir-condicao-medica.usecase';
import { BuscarDadosDashboardUseCase } from '../core/application/use-cases/dashboard/buscar-dados-dashboard.usecase';
import { BuscarProximoEventoUseCase } from '../core/application/use-cases/dashboard/buscar-proximo-evento.usecase';
import { BuscarEventoUseCase } from '../core/application/use-cases/evento/buscar-evento.usecase';
import { BuscarPeriodoEventoUseCase } from '../core/application/use-cases/evento/buscar-periodo-evento.usecase';
import { BuscarFuncoesEventoUseCase } from '../core/application/use-cases/funcao-evento/buscar-funcoes-evento.usecase';
import { EditarFuncaoEventoUseCase } from '../core/application/use-cases/funcao-evento/editar-funcao-evento.usecase';
import { BuscarFuncaoEventoUseCase } from '../core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { BuscarFuncaoIgrejaUseCase } from '../core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { CancelarInscricaoUseCase } from '../core/application/use-cases/gestao-inscricao/cancelar-inscricao.usecase';
import { GestaoInscricaoUseCase } from '../core/application/use-cases/gestao-inscricao/gestao-inscricao-usecase';
import { BuscarInscricoesPagamentoUseCase } from '../core/application/use-cases/gestao-pagamento/buscar-inscricoes-pagamento.usecase';
import { ConfirmarPagamentoManualmenteUseCase } from '../core/application/use-cases/gestao-pagamento/confirmar-pagamento-manualmente.usecase';
import { GerarNovoPixUseCase } from '../core/application/use-cases/gestao-pagamento/gerar-novo-pix.usecase';
import { AlterarRoleUsuarioUseCase } from '../core/application/use-cases/gestao-usuario/alterar-role-usuario.usecase';
import { AlterarSenhaUsuarioUseCase } from '../core/application/use-cases/gestao-usuario/alterar-senha-usuario.usecase';
import { BuscarUsuarioUseCase } from '../core/application/use-cases/gestao-usuario/buscar-usuario.usecase';
import { BuscarIgrejaUseCase } from '../core/application/use-cases/igreja/buscar-classe.usecase';
import { DeletarIgrejaUseCase } from '../core/application/use-cases/igreja/deletar-classe.usecase';
import { EditarIgrejaUseCase } from '../core/application/use-cases/igreja/editar-classe.usecase';
import { InserirIgrejaUseCase } from '../core/application/use-cases/igreja/inserir-classe.usecase';
import { BuscarInscricaoUseCase } from '../core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { DeletarInscricaoUseCase } from '../core/application/use-cases/inscricao/deletar-inscricao.usecase';
import { EditarInscricaoUseCase } from '../core/application/use-cases/inscricao/editar-inscricao.usecase';
import { InserirInscricaoUseCase } from '../core/application/use-cases/inscricao/inserir-inscricao.usecase';
import { BuscarInstrumentoUseCase } from '../core/application/use-cases/instrumento/buscar-instrumento.usecase';
import { DeletarInstrumentoUseCase } from '../core/application/use-cases/instrumento/deletar-instrumento.usecase';
import { EditarInstrumentoUseCase } from '../core/application/use-cases/instrumento/editar-instrumento.usecase';
import { InserirInstrumentoUseCase } from '../core/application/use-cases/instrumento/inserir-instrumento.usecase';
import { BuscarPastorUseCase } from '../core/application/use-cases/pastor/buscar-pastor.usecase';
import { DeletarPastorUseCase } from '../core/application/use-cases/pastor/deletar-pastor.usecase';
import { EditarPastorUseCase } from '../core/application/use-cases/pastor/editar-pastor.usecase';
import { InserirPastorUseCase } from '../core/application/use-cases/pastor/inserir-pastor.usecase';
import { BuscarQrCodeCheckinUseCase } from '../core/application/use-cases/qrcode/buscar-qrcode-checkin.usecase';
import { BuscarQrCodePagamentoUseCase } from '../core/application/use-cases/qrcode/buscar-qrcode-pagamento.usecase';
import { BuscarRegiaoUseCase } from '../core/application/use-cases/regiao/buscar-regiao.usecase';
import { DeletarRegiaoUseCase } from '../core/application/use-cases/regiao/deletar-regiao.usecase';
import { EditarRegiaoUseCase } from '../core/application/use-cases/regiao/editar-regiao.usecase';
import { InserirRegiaoUseCase } from '../core/application/use-cases/regiao/inserir-regiao.usecase';
import { ExportarRelatoriosUseCase } from '../core/application/use-cases/relatorios/exportar-relatorio.usecase';
import { BuscarUsuarioAdminUseCase } from '../core/application/use-cases/usuario/buscar-usuario-admin.usecase';
import { EditarUsuarioUseCase } from '../core/application/use-cases/usuario/editar-usuario.usecase';
import { ValidarUsuarioUseCase } from '../core/application/use-cases/usuario/validar-usuario.usecase';
import { AlocarInscritosVisitaUseCase } from '../core/application/use-cases/visita/alocar-inscritos-visita.usecase';
import { BuscarFuncoesVisitaUseCase } from '../core/application/use-cases/visita/buscar-funcoes-visita.usecase';
import { BuscarInscritosVisitaUseCase } from '../core/application/use-cases/visita/buscar-inscritos-visita.usecase';
import { BuscarVisitaUseCase } from '../core/application/use-cases/visita/buscar-visita.usecase';
import { CriarVisitaUseCase } from '../core/application/use-cases/visita/criar-visita.usecase';
import { DeletarVisitaUseCase } from '../core/application/use-cases/visita/deletar-visita.usecase';
import { EditarVisitaUseCase } from '../core/application/use-cases/visita/editar-visita.usecase';
import { BuscarParticipantesCheckinPort } from '../core/domain/ports/checkin/buscar-participantes-checkin.port';
import { ValidarQrCodeParticipantePort } from '../core/domain/ports/checkin/validar-qrcode-participante.port';
import { BuscarClassePort } from '../core/domain/ports/classe/buscar-classe.port';
import { BuscarCondicaoMedicaPort } from '../core/domain/ports/condicao-medica/buscar-condicao-medica.port';
import { DeletarCondicaoMedicaPort } from '../core/domain/ports/condicao-medica/deletar-condicao-medica.port';
import { EditarCondicaoMedicaPort } from '../core/domain/ports/condicao-medica/editar-condicao-medica.port';
import { InserirCondicaoMedicaPort } from '../core/domain/ports/condicao-medica/inserir-condicao-medica.port';
import { BuscarDadosDashboardPort } from '../core/domain/ports/dashboard/buscar-dados-dashboard.port';
import { BuscarProximoEventoPort } from '../core/domain/ports/dashboard/buscar-proximo-evento.port';
import { BuscarEventoPort } from '../core/domain/ports/evento/buscar-evento.port';
import { BuscarPeriodoEventoPort } from '../core/domain/ports/evento/buscar-periodo-evento.port';
import { BuscarTodasFuncoesEventoPort } from '../core/domain/ports/funcao-evento/buscar-todas-funcoes-evento.port';
import { EditarFuncaoEventoPort } from '../core/domain/ports/funcao-evento/editar-funcao-evento.port';
import { BuscarFuncaoEventoPort } from '../core/domain/ports/funcao/buscar-funcao-evento.port';
import { BuscarFuncaoIgrejaPort } from '../core/domain/ports/funcao/buscar-funcao-igreja.port';
import { CancelarInscricaoPort } from '../core/domain/ports/gestao-inscricao/cancelar-inscricao.port';
import { GestaoInscricaoPort } from '../core/domain/ports/gestao-inscricao/gestao-inscricao.port';
import { BuscarInscricoesPagamentoPort } from '../core/domain/ports/gestao-pagamento/buscar-inscricoes-pagamento.port';
import { ConfirmarPagamentoPort } from '../core/domain/ports/gestao-pagamento/confirmar-pagamento-manualmente.port';
import { GerarNovoPixPort } from '../core/domain/ports/gestao-pagamento/gerar-novo-pix.port';
import { AlterarRoleUsuarioPort } from '../core/domain/ports/gestao-usuario/alterar-role-usuario.port';
import { AlterarSenhaUsuarioPort } from '../core/domain/ports/gestao-usuario/alterar-senha-usuario.port';
import { BuscarUsuariosPort } from '../core/domain/ports/gestao-usuario/buscar-usuarios.port';
import { BuscarIgrejaPort } from '../core/domain/ports/igreja/buscar-igreja.port';
import { DeletarIgrejaPort } from '../core/domain/ports/igreja/deletar-igreja.port';
import { EditarIgrejaPort } from '../core/domain/ports/igreja/editar-igreja.port';
import { InserirIgrejaPort } from '../core/domain/ports/igreja/inserir-igreja.port';
import { BuscarInscricaoPort } from '../core/domain/ports/inscricao/buscar-inscricao.port';
import { DeletarInscricaoPort } from '../core/domain/ports/inscricao/deletar-inscricao.port';
import { EditarInscricaoPort } from '../core/domain/ports/inscricao/editar-inscricao.port';
import { InserirInscricaoPort } from '../core/domain/ports/inscricao/inserir-inscricao.port';
import { BuscarInstrumentoPort } from '../core/domain/ports/instrumento/buscar-instrumento.port';
import { DeletarInstrumentoPort } from '../core/domain/ports/instrumento/deletar-instrumento.port';
import { EditarInstrumentoPort } from '../core/domain/ports/instrumento/editar-instrumento.port';
import { InserirInstrumentoPort } from '../core/domain/ports/instrumento/inserir-instrumento.port';
import { BuscarPastorPort } from '../core/domain/ports/pastor/buscar-pastor.port';
import { DeletarPastorPort } from '../core/domain/ports/pastor/deletar-pastor.port';
import { EditarPastorPort } from '../core/domain/ports/pastor/editar-pastor.port';
import { InserirPastorPort } from '../core/domain/ports/pastor/inserir-pastor.port';
import { BuscarQrCodeCheckinPort } from '../core/domain/ports/qrcode/buscar-qrcode-checkin.port';
import { BuscarQrCodePagamentoPort } from '../core/domain/ports/qrcode/buscar-qrcode-pagamento.port';
import { BuscarRegiaoPort } from '../core/domain/ports/regiao/buscar-regiao.port';
import { DeletarRegiaoPort } from '../core/domain/ports/regiao/deletar-regiao.port';
import { EditarRegiaoPort } from '../core/domain/ports/regiao/editar-regiao.port';
import { InserirRegiaoPort } from '../core/domain/ports/regiao/inserir-regiao.port';
import { ExportarRelatorioPort } from '../core/domain/ports/relatorios/exportar-relatorios.port';
import { BuscarUsuarioAdminPort } from '../core/domain/ports/usuario/buscar-usuario-admin.port';
import { EditarUsuarioPort } from '../core/domain/ports/usuario/editar-usuario.port';
import { ValidarUsuarioPort } from '../core/domain/ports/usuario/validar-usuario.port';
import { AlocarInscritosVisitaPort } from '../core/domain/ports/visita/alocar-inscritos-visita.port';
import { BuscarFuncoesVisitaPort } from '../core/domain/ports/visita/buscar-funcoes-visita.port';
import { BuscarInscritosVisitaPort } from '../core/domain/ports/visita/buscar-inscritos-visita.port';
import { BuscarVisitaPort } from '../core/domain/ports/visita/buscar-visita.port';
import { CriarVisitaPort } from '../core/domain/ports/visita/criar-visita.port';
import { DeletarVisitaPort } from '../core/domain/ports/visita/deletar-visita.port';
import { EditarVisitaPort } from '../core/domain/ports/visita/editar-visita.port';
import { BuscarParticipantesCheckinAdapter } from '../infrastructure/adapter/checkin/buscar-participantes-checkin.adapter';
import { ValidarQrCodeParticipanteAdapter } from '../infrastructure/adapter/checkin/validar-qrcode-participante.adapter';
import { BuscarClasseAdapter } from '../infrastructure/adapter/classe/buscar-classe.adapter';
import { BuscarCondicaoMedicaAdapter } from '../infrastructure/adapter/condicao-medica/buscar-condicao-medica.adapter';
import { DeletarCondicaoMedicaAdapter } from '../infrastructure/adapter/condicao-medica/deletar-condicao-medica.adapter';
import { EditarCondicaoMedicaAdapter } from '../infrastructure/adapter/condicao-medica/editar-condicao-medica.adapter';
import { InserirCondicaoMedicaAdapter } from '../infrastructure/adapter/condicao-medica/inserir-condicao-medica.adapter';
import { BuscarDadosDashboardAdapter } from '../infrastructure/adapter/dashboard/buscar-dados-dashboard.adapter';
import { BuscarProximoEventoAdapter } from '../infrastructure/adapter/dashboard/buscar-proximo-evento.adapter';
import { BuscarEventoAdapter } from '../infrastructure/adapter/evento/buscar-evento.adapter';
import { BuscarPeriodoEventoAdapter } from '../infrastructure/adapter/evento/buscar-periodo-evento.adapter';
import { BuscarTodasFuncoesEventoAdapter } from '../infrastructure/adapter/funcao-evento/buscar-funcoes-evento.adapter';
import { EditarFuncaoEventoAdapter } from '../infrastructure/adapter/funcao-evento/editar-funcao-evento.adapter';
import { BuscarFuncaoEventoAdapter } from '../infrastructure/adapter/funcao/buscar-funcao-evento.adapter';
import { BuscarFuncaoIgrejaAdapter } from '../infrastructure/adapter/funcao/buscar-funcao-igreja.adapter';
import { CancelarInscricaoAdapter } from '../infrastructure/adapter/gestao-inscricao/cancelar-inscricao.adapter';
import { GestaoInscricaoAdapter } from '../infrastructure/adapter/gestao-inscricao/gestao-inscricao.adapter';
import { BuscarInscricoesPagamentoAdapter } from '../infrastructure/adapter/gestao-pagamento/buscar-inscricoes-pagamento.adapter';
import { ConfirmarPagamentoAdapter } from '../infrastructure/adapter/gestao-pagamento/confirmar-pagamento-manualmente.adapter';
import { GerarNovoPixAdapter } from '../infrastructure/adapter/gestao-pagamento/gerar-novo-pix.adapter';
import { AlterarRoleUsuarioAdapter } from '../infrastructure/adapter/gestao-usuario/alterar-role-usuario.adapter';
import { AlterarSenhaUsuarioAdapter } from '../infrastructure/adapter/gestao-usuario/alterar-senha-usuario.adapter';
import { BuscarUsuarioAdapter } from '../infrastructure/adapter/gestao-usuario/buscar-usuarios.adapter';
import { BuscarIgrejaAdapter } from '../infrastructure/adapter/igreja/buscar-igreja.adapter';
import { DeletarIgrejaAdapter } from '../infrastructure/adapter/igreja/deletar-igreja.adapter';
import { EditarIgrejaAdapter } from '../infrastructure/adapter/igreja/editar-igreja.adapter';
import { InserirIgrejaAdapter } from '../infrastructure/adapter/igreja/inserir-igreja.adapter';
import { BuscarInscricaoAdapter } from '../infrastructure/adapter/inscricao/buscar-inscricao.adapter';
import { DeletarInscricaoAdapter } from '../infrastructure/adapter/inscricao/deletar-inscricao.adapter';
import { EditarInscricaoAdapter } from '../infrastructure/adapter/inscricao/editar-inscricao.adapter';
import { InserirInscricaoAdapter } from '../infrastructure/adapter/inscricao/inserir-inscricao.adapter';
import { BuscarInstrumentoAdapter } from '../infrastructure/adapter/instrumento/buscar-instrumento.adapter';
import { DeletarInstrumentoAdapter } from '../infrastructure/adapter/instrumento/deletar-instrumento.adapter';
import { EditarInstrumentoAdapter } from '../infrastructure/adapter/instrumento/editar-instrumento.adapter';
import { InserirInstrumentoAdapter } from '../infrastructure/adapter/instrumento/inserir-instrumento.adapter';
import { BuscarPastorAdapter } from '../infrastructure/adapter/pastor/buscar-pastor.adapter';
import { DeletarPastorAdapter } from '../infrastructure/adapter/pastor/deletar-pastor.adapter';
import { EditarPastorAdapter } from '../infrastructure/adapter/pastor/editar-pastor.adapter';
import { InserirPastorAdapter } from '../infrastructure/adapter/pastor/inserir-pastor.adapter';
import { BuscarQrCodeCheckinAdapter } from '../infrastructure/adapter/qrcode/buscar-qrcode-checkin.adapter';
import { BuscarQrCodePagamentoAdapter } from '../infrastructure/adapter/qrcode/buscar-qrcode-pagamento.adapter';
import { BuscarRegiaoAdapter } from '../infrastructure/adapter/regiao/buscar-regiao.adapter';
import { DeletarRegiaoAdapter } from '../infrastructure/adapter/regiao/deletar-regiao.adapter';
import { EditarRegiaoAdapter } from '../infrastructure/adapter/regiao/editar-regiao.adapter';
import { InserirRegiaoAdapter } from '../infrastructure/adapter/regiao/inserir-regiao.adapter';
import { ExportarRelatorioAdapter } from '../infrastructure/adapter/relatorios/exportar-relatorio.adapter';
import { BuscarUsuarioAdminAdapter } from '../infrastructure/adapter/usuario/buscar-usuario-admin.adapter';
import { EditarUsuarioAdapter } from '../infrastructure/adapter/usuario/editar-usuario.port.adapter';
import { ValidarUsuarioAdapter } from '../infrastructure/adapter/usuario/validar-usuario.adapter';
import { AlocarInscritosVisitaAdapter } from '../infrastructure/adapter/visita/alocar-inscritos-visita.adapter';
import { BuscarFuncoesVisitaAdapter } from '../infrastructure/adapter/visita/buscar-funcoes-visita.adapter';
import { BuscarInscritosVisitaAdapter } from '../infrastructure/adapter/visita/buscar-inscritos-visita.adapter';
import { BuscarVisitaAdapter } from '../infrastructure/adapter/visita/buscar-visita.adapter';
import { CriarVisitaAdapter } from '../infrastructure/adapter/visita/criar-visita.adapter';
import { DeletarVisitaAdapter } from '../infrastructure/adapter/visita/deletar-visita.adapter';
import { EditarVisitaAdapter } from '../infrastructure/adapter/visita/editar-visita.adapter';
import { SharedModule } from './shared.module';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,

    FormDadosPessoaisComponent,
    FormDadosIgrejaComponent,
    FormUsuarioComponent,
    FormAdminComponent,
    FormInicialComponent,
    FormDadosAdicionaisComponent,
    ConfirmacaoComponent,
    FormDadosEventoComponent,
    SucessoComponent,
    PerfilComponent,
    EscolhaInicialComponent,
    HomeLogadaComponent,
    DashboardInicialComponent,
    CheckInComponent,

    ObterTodasComponent,
    PendentesAprovacaoComponent,
    GestaoInscricaoComponent,
    GestaoVisitasComponent,
    VisitasNaoAlocadasComponent,
    VisitasAlocadasComponent,
    GestaoPagamentoComponent,
    RelatoriosComponent,
    CrudVisitaComponent,
    GestaoUsuarioComponent,

    ModalQrcodeCheckinComponent,
    ModalCheckinConfirmadoComponent,
    ModalParticipanteHorarioErradoComponent,
    ModalInfoInscricaoComponent,
    ModalAlocacaoVisitaComponent,
    ModalPagamentoConfirmadoComponent,
    ModalInfoVisitaComponent,
    ModalEdicaoUsuarioComponent,
    ModalCadastroVisitaComponent,

    FiltroCheckinComponent,
    FiltroGestaoUsuarioComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [
    provideLottieOptions({ player: () => player }),
    // CLASSE
    BuscarClasseUseCase,
    { provide: BuscarClassePort, useClass: BuscarClasseAdapter,},
    
    // CONDICAO MEDICA
    BuscarCondicaoMedicaUseCase,
    { provide: BuscarCondicaoMedicaPort, useClass: BuscarCondicaoMedicaAdapter,},
    InserirCondicaoMedicaUseCase,
    { provide: InserirCondicaoMedicaPort, useClass: InserirCondicaoMedicaAdapter,},
    DeletarCondicaoMedicaUseCase,
    { provide: DeletarCondicaoMedicaPort, useClass: DeletarCondicaoMedicaAdapter,},
    EditarCondicaoMedicaUseCase,
    { provide: EditarCondicaoMedicaPort, useClass: EditarCondicaoMedicaAdapter,},
   
    // FUNCAO EVENTO
    BuscarFuncaoEventoUseCase,
    { provide: BuscarFuncaoEventoPort, useClass: BuscarFuncaoEventoAdapter,},
    BuscarFuncaoIgrejaUseCase,
    { provide: BuscarFuncaoIgrejaPort, useClass: BuscarFuncaoIgrejaAdapter,},
   
    // INSTRUMENTO
    BuscarInstrumentoUseCase,
    { provide: BuscarInstrumentoPort, useClass: BuscarInstrumentoAdapter,},
    InserirInstrumentoUseCase,
    { provide: InserirInstrumentoPort, useClass: InserirInstrumentoAdapter },
    DeletarInstrumentoUseCase,
    { provide: DeletarInstrumentoPort, useClass: DeletarInstrumentoAdapter },
    EditarInstrumentoUseCase,
    { provide: EditarInstrumentoPort, useClass: EditarInstrumentoAdapter },
    
    // INSCRICAO
    BuscarInscricaoUseCase,
    { provide: BuscarInscricaoPort, useClass: BuscarInscricaoAdapter },
    InserirInscricaoUseCase,
    { provide: InserirInscricaoPort, useClass: InserirInscricaoAdapter },
    DeletarInscricaoUseCase,
    { provide: DeletarInscricaoPort, useClass: DeletarInscricaoAdapter },
    EditarInscricaoUseCase,
    { provide: EditarInscricaoPort, useClass: EditarInscricaoAdapter },
    GestaoInscricaoUseCase,
    { provide: GestaoInscricaoPort, useClass: GestaoInscricaoAdapter },
    BuscarInscricoesPagamentoUseCase,
    { provide: BuscarInscricoesPagamentoPort, useClass: BuscarInscricoesPagamentoAdapter,},
    
    // REGIAO
    BuscarRegiaoUseCase,
    { provide: BuscarRegiaoPort, useClass: BuscarRegiaoAdapter },
    DeletarRegiaoUseCase,
    { provide: DeletarRegiaoPort, useClass: DeletarRegiaoAdapter },
    EditarRegiaoUseCase,
    { provide: EditarRegiaoPort, useClass: EditarRegiaoAdapter },
    InserirRegiaoUseCase,
    { provide: InserirRegiaoPort, useClass: InserirRegiaoAdapter },
   
    // EVENTO
    BuscarEventoUseCase,
    { provide: BuscarEventoPort, useClass: BuscarEventoAdapter },
    BuscarProximoEventoUseCase,
    { provide: BuscarProximoEventoPort, useClass: BuscarProximoEventoAdapter },
   
    // IGREJA
    BuscarIgrejaUseCase,
    { provide: BuscarIgrejaPort, useClass: BuscarIgrejaAdapter },
    DeletarIgrejaUseCase,
    { provide: DeletarIgrejaPort, useClass: DeletarIgrejaAdapter },
    EditarIgrejaUseCase,
    { provide: EditarIgrejaPort, useClass: EditarIgrejaAdapter },
    InserirIgrejaUseCase,
    { provide: InserirIgrejaPort, useClass: InserirIgrejaAdapter },
   
    // CHECKIN
    BuscarQrCodeCheckinUseCase,
    { provide: BuscarQrCodeCheckinPort, useClass: BuscarQrCodeCheckinAdapter },
    BuscarParticipantesCheckinUseCase,
    { provide: BuscarParticipantesCheckinPort, useClass: BuscarParticipantesCheckinAdapter,},
    ValidarQrCodeParticipanteUseCase,
    { provide: ValidarQrCodeParticipantePort, useClass: ValidarQrCodeParticipanteAdapter,},
   
    // PERIODO
    BuscarPeriodoEventoUseCase,
    { provide: BuscarPeriodoEventoPort, useClass: BuscarPeriodoEventoAdapter },
   
    // DASHBOARD
    BuscarDadosDashboardUseCase,
    { provide: BuscarDadosDashboardPort, useClass: BuscarDadosDashboardAdapter,},  

    // PAGAMENTO
    ConfirmarPagamentoManualmenteUseCase,
    { provide: ConfirmarPagamentoPort, useClass: ConfirmarPagamentoAdapter },
    GerarNovoPixUseCase,
    { provide: GerarNovoPixPort, useClass: GerarNovoPixAdapter },
    CancelarInscricaoUseCase,
    { provide: CancelarInscricaoPort, useClass: CancelarInscricaoAdapter },
    BuscarQrCodePagamentoUseCase,
    { provide: BuscarQrCodePagamentoPort, useClass: BuscarQrCodePagamentoAdapter,},
    
    // RELATORIO
    ExportarRelatoriosUseCase,
    { provide: ExportarRelatorioPort, useClass: ExportarRelatorioAdapter },
   
    // VISITA
    CriarVisitaUseCase,
    { provide: CriarVisitaPort, useClass: CriarVisitaAdapter },
    EditarVisitaUseCase,
    { provide: EditarVisitaPort, useClass: EditarVisitaAdapter },
    DeletarVisitaUseCase,
    { provide: DeletarVisitaPort, useClass: DeletarVisitaAdapter },
    BuscarVisitaUseCase,
    { provide: BuscarVisitaPort, useClass: BuscarVisitaAdapter },
    AlocarInscritosVisitaUseCase,
    { provide: AlocarInscritosVisitaPort, useClass: AlocarInscritosVisitaAdapter,},
    BuscarFuncoesVisitaUseCase,
    { provide: BuscarFuncoesVisitaPort, useClass: BuscarFuncoesVisitaAdapter },
    BuscarInscritosVisitaUseCase,
    { provide: BuscarInscritosVisitaPort, useClass: BuscarInscritosVisitaAdapter,},
    
    // USUARIO
    BuscarUsuarioUseCase,
    { provide: BuscarUsuariosPort, useClass: BuscarUsuarioAdapter },
    AlterarRoleUsuarioUseCase,
    { provide: AlterarRoleUsuarioPort, useClass: AlterarRoleUsuarioAdapter },
    AlterarSenhaUsuarioUseCase,
    { provide: AlterarSenhaUsuarioPort, useClass: AlterarSenhaUsuarioAdapter },
    EditarUsuarioUseCase,
    { provide: EditarUsuarioPort, useClass: EditarUsuarioAdapter },
    ValidarUsuarioUseCase,
    { provide: ValidarUsuarioPort, useClass: ValidarUsuarioAdapter },
    BuscarUsuarioAdminUseCase,
    { provide: BuscarUsuarioAdminPort, useClass: BuscarUsuarioAdminAdapter },
   
    // FUNCAO EVENTO
    BuscarFuncoesEventoUseCase,
    { provide: BuscarTodasFuncoesEventoPort, useClass: BuscarTodasFuncoesEventoAdapter,},
    EditarFuncaoEventoUseCase,
    { provide: EditarFuncaoEventoPort, useClass: EditarFuncaoEventoAdapter },
    
    // PASTOR
    BuscarPastorUseCase,
    { provide: BuscarPastorPort, useClass: BuscarPastorAdapter },
    DeletarPastorUseCase,
    { provide: DeletarPastorPort, useClass: DeletarPastorAdapter },
    EditarPastorUseCase,
    { provide: EditarPastorPort, useClass: EditarPastorAdapter },
    InserirPastorUseCase,
    { provide: InserirPastorPort, useClass: InserirPastorAdapter },
  ],
  exports:[
    LoginComponent,
    CadastroComponent,

    FormDadosPessoaisComponent,
    FormDadosIgrejaComponent,
    FormUsuarioComponent,
    FormAdminComponent,
    FormInicialComponent,
    FormDadosAdicionaisComponent,
    ConfirmacaoComponent,
    FormDadosEventoComponent,
    SucessoComponent,
    PerfilComponent,
    EscolhaInicialComponent,
    HomeLogadaComponent,
    DashboardInicialComponent,
    CheckInComponent,

    ObterTodasComponent,
    PendentesAprovacaoComponent,
    GestaoInscricaoComponent,
    GestaoVisitasComponent,
    VisitasNaoAlocadasComponent,
    VisitasAlocadasComponent,
    GestaoPagamentoComponent,
    RelatoriosComponent,
    CrudVisitaComponent,
    GestaoUsuarioComponent,

    ModalQrcodeCheckinComponent,
    ModalCheckinConfirmadoComponent,
    ModalParticipanteHorarioErradoComponent,
    ModalInfoInscricaoComponent,
    ModalAlocacaoVisitaComponent,
    ModalPagamentoConfirmadoComponent,
    ModalInfoVisitaComponent,
    ModalEdicaoUsuarioComponent,
    ModalCadastroVisitaComponent,

    FiltroCheckinComponent,
    FiltroGestaoUsuarioComponent,
  ]
})
export class FeatureModule {}
