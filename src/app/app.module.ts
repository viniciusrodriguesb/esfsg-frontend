import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BuscarClasseUseCase } from './core/application/use-cases/classe/buscar-classe.usecase';
import { BuscarClassePort } from './core/domain/ports/classe/buscar-classe.port';
import { BuscarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/buscar-condicao-medica.usecase';
import { BuscarCondicaoMedicaPort } from './core/domain/ports/condicao-medica/buscar-condicao-medica.port';
import { BuscarClasseAdapter } from './infrastructure/adapter/classe/buscar-classe.adapter';
import { BuscarCondicaoMedicaAdapter } from './infrastructure/adapter/condicao-medica/buscar-condicao-medica.adapter';
import { InserirCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/inserir-condicao-medica.usecase';
import { InserirCondicaoMedicaPort } from './core/domain/ports/condicao-medica/inserir-condicao-medica.port';
import { InserirCondicaoMedicaAdapter } from './infrastructure/adapter/condicao-medica/inserir-condicao-medica.adapter';
import { DeletarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/deletar-condicao-medica.usecase';
import { DeletarCondicaoMedicaPort } from './core/domain/ports/condicao-medica/deletar-condicao-medica.port';
import { DeletarCondicaoMedicaAdapter } from './infrastructure/adapter/condicao-medica/deletar-condicao-medica.adapter';
import { EditarCondicaoMedicaUseCase } from './core/application/use-cases/condicao-medica/editar-condicao-medica.usecase';
import { EditarCondicaoMedicaPort } from './core/domain/ports/condicao-medica/editar-condicao-medica.port';
import { EditarCondicaoMedicaAdapter } from './infrastructure/adapter/condicao-medica/editar-condicao-medica.adapter';
import { BuscarFuncaoEventoUseCase } from './core/application/use-cases/funcao/buscar-funcao-evento.usecase';
import { BuscarFuncaoIgrejaUseCase } from './core/application/use-cases/funcao/buscar-funcao-igreja.usecase';
import { BuscarFuncaoEventoPort } from './core/domain/ports/funcao/buscar-funcao-evento.port';
import { BuscarFuncaoIgrejaPort } from './core/domain/ports/funcao/buscar-funcao-igreja.port';
import { BuscarFuncaoEventoAdapter } from './infrastructure/adapter/funcao/buscar-funcao-evento.adapter';
import { BuscarFuncaoIgrejaAdapter } from './infrastructure/adapter/funcao/buscar-funcao-igreja.adapter';
import { BuscarInstrumentoUseCase } from './core/application/use-cases/instrumento/buscar-instrumento.usecase';
import { BuscarInstrumentoAdapter } from './infrastructure/adapter/instrumento/buscar-instrumento.adapter';
import { BuscarInstrumentoPort } from './core/domain/ports/instrumento/buscar-instrumento.port';
import { DeletarInstrumentoUseCase } from './core/application/use-cases/instrumento/deletar-instrumento.usecase';
import { EditarInstrumentoUseCase } from './core/application/use-cases/instrumento/editar-instrumento.usecase';
import { InserirInstrumentoUseCase } from './core/application/use-cases/instrumento/inserir-instrumento.usecase';
import { DeletarInstrumentoPort } from './core/domain/ports/instrumento/deletar-instrumento.port';
import { EditarInstrumentoPort } from './core/domain/ports/instrumento/editar-instrumento.port';
import { InserirInstrumentoPort } from './core/domain/ports/instrumento/inserir-instrumento.port';
import { DeletarInstrumentoAdapter } from './infrastructure/adapter/instrumento/deletar-instrumento.adapter';
import { EditarInstrumentoAdapter } from './infrastructure/adapter/instrumento/editar-instrumento.adapter';
import { InserirInstrumentoAdapter } from './infrastructure/adapter/instrumento/inserir-instrumento.adapter';
import { DeletarInscricaoUseCase } from './core/application/use-cases/inscricao/deletar-inscricao.usecase';
import { EditarInscricaoUseCase } from './core/application/use-cases/inscricao/editar-inscricao.usecase';
import { InserirInscricaoUseCase } from './core/application/use-cases/inscricao/inserir-inscricao.usecase';
import { DeletarInscricaoPort } from './core/domain/ports/inscricao/deletar-inscricao.port';
import { EditarInscricaoPort } from './core/domain/ports/inscricao/editar-inscricao.port';
import { InserirInscricaoPort } from './core/domain/ports/inscricao/inserir-inscricao.port';
import { DeletarInscricaoAdapter } from './infrastructure/adapter/inscricao/deletar-inscricao.adapter';
import { EditarInscricaoAdapter } from './infrastructure/adapter/inscricao/editar-inscricao.adapter';
import { InserirInscricaoAdapter } from './infrastructure/adapter/inscricao/inserir-inscricao.adapter';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './presentation/pages/login/login.component';
import { CadastroComponent } from './presentation/pages/cadastro/cadastro.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './presentation/ui/input/input.component';
import {
  LucideAngularModule,
  CircleX,
  CircleCheck,
  Check,
  X,
  Eye,
  EyeClosed,
  User,
  Building,
  ChevronLeft,
  Ticket,
  ChevronRight,
  Trash2,
  Plus,
  MoveRight,
  Church,
  CirclePlus,
  Car,
  Pencil,
  Baby,
  CheckCheck,
  LogIn,
  ListCheck,
  MapPin,
  BadgeCheck,
  HandHeart,
  QrCode,
  Ban,
  MessageSquare,
  Wallet,
  Copy,
  ShieldUser,
  MoveLeft,
  Calendar,
  Ellipsis,
  CircleAlert,
  Sun,
  Moon,
} from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
import { FormDadosPessoaisComponent } from './presentation/pages/cadastro/form-dados-pessoais/form-dados-pessoais.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { FormDadosIgrejaComponent } from './presentation/pages/cadastro/form-dados-igreja/form-dados-igreja.component';
import { BuscarRegiaoUseCase } from './core/application/use-cases/regiao/buscar-regiao.usecase';
import { BuscarRegiaoPort } from './core/domain/ports/regiao/buscar-regiao.port';
import { BuscarRegiaoAdapter } from './infrastructure/adapter/regiao/buscar-regiao.adapter';
import { FormUsuarioComponent } from './presentation/pages/login/form-usuario/form-usuario.component';
import { FormAdminComponent } from './presentation/pages/login/form-admin/form-admin.component';
import { ValidarUsuarioUseCase } from './core/application/use-cases/usuario/validar-usuario.usecase';
import { ValidarUsuarioPort } from './core/domain/ports/usuario/validar-usuario.port';
import { ValidarUsuarioAdapter } from './infrastructure/adapter/usuario/validar-usuario.adapter';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormInicialComponent } from './presentation/pages/cadastro/form-inicial/form-inicial.component';
import { BuscarEventoUseCase } from './core/application/use-cases/evento/buscar-evento.usecase';
import { BuscarEventoAdapter } from './infrastructure/adapter/evento/buscar-evento.adapter';
import { BuscarEventoPort } from './core/domain/ports/evento/buscar-evento.port';
import { NomePipe } from './presentation/pipes/nome.pipe';
import { FormDadosAdicionaisComponent } from './presentation/pages/cadastro/form-dados-adicionais/form-dados-adicionais.component';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { ConfirmacaoComponent } from './presentation/pages/cadastro/confirmacao/confirmacao.component';
import { FormDadosEventoComponent } from './presentation/pages/cadastro/form-dados-evento/form-dados-evento.component';
import { BuscarIgrejaUseCase } from './core/application/use-cases/igreja/buscar-classe.usecase';
import { BuscarIgrejaAdapter } from './infrastructure/adapter/igreja/buscar-igreja.adapter';
import { BuscarIgrejaPort } from './core/domain/ports/igreja/buscar-igreja.port';
import { SucessoComponent } from './presentation/pages/cadastro/sucesso/sucesso.component';
import { PerfilComponent } from './presentation/pages/perfil/perfil.component';
import { BuscarInscricaoUseCase } from './core/application/use-cases/inscricao/buscar-inscricao.usecase';
import { BuscarInscricaoAdapter } from './infrastructure/adapter/inscricao/buscar-inscricao.adapter';
import { BuscarInscricaoPort } from './core/domain/ports/inscricao/buscar-inscricao.port';
import { BuscarQrCodeCheckinUseCase } from './core/application/use-cases/qrcode/buscar-qrcode-checkin.usecase';
import { BuscarQrCodeCheckinAdapter } from './infrastructure/adapter/qrcode/buscar-qrcode-checkin.adapter';
import { BuscarQrCodeCheckinPort } from './core/domain/ports/qrcode/buscar-qrcode-checkin.port';
import { BuscarQrCodePagamentoPort } from './core/domain/ports/qrcode/buscar-qrcode-pagamento.port';
import { BuscarQrCodePagamentoUseCase } from './core/application/use-cases/qrcode/buscar-qrcode-pagamento.usecase';
import { BuscarQrCodePagamentoAdapter } from './infrastructure/adapter/qrcode/buscar-qrcode-pagamento.adapter';
import { BuscarPeriodoEventoUseCase } from './core/application/use-cases/evento/buscar-periodo-evento.usecase';
import { BuscarPeriodoEventoPort } from './core/domain/ports/evento/buscar-periodo-evento.port';
import { BuscarPeriodoEventoAdapter } from './infrastructure/adapter/evento/buscar-periodo-evento.adapter';
import { EscolhaInicialComponent } from './presentation/pages/escolha-inicial/escolha-inicial.component';
import { BuscarUsuarioAdminUseCase } from './core/application/use-cases/usuario/buscar-usuario-admin.usecase';
import { BuscarUsuarioAdminPort } from './core/domain/ports/usuario/buscar-usuario-admin.port';
import { BuscarUsuarioAdminAdapter } from './infrastructure/adapter/usuario/buscar-usuario-admin.adapter';
import { HomeLogadaComponent } from './presentation/pages/home-logada/home-logada.component';
import { DashboardInicialComponent } from './presentation/pages/home-logada/dashboard-inicial/dashboard-inicial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    InputComponent,
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
    DashboardInicialComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LottieComponent,

    // Configuração das bibliotecas
    NgxMaskModule.forRoot(),
    LucideAngularModule.pick({
      CircleX,
      CircleCheck,
      Check,
      X,
      Eye,
      EyeClosed,
      User,
      Building,
      ChevronLeft,
      ChevronRight,
      Ticket,
      Trash2,
      Plus,
      MoveRight,
      MoveLeft,
      Church,
      Baby,
      Car,
      Pencil,
      CheckCheck,
      ListCheck,
      LogIn,
      CirclePlus,
      MapPin,
      BadgeCheck,
      HandHeart,
      QrCode,
      Ban,
      MessageSquare,
      Wallet,
      Copy,
      ShieldUser,
      Calendar,
      Ellipsis,
      CircleAlert,
      Sun,
      Moon
    }),
    SweetAlert2Module.forRoot(),

    // Angular Material Modules
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [
    provideLottieOptions({ player: () => player }),
    provideHttpClient(withInterceptorsFromDi()),
    BuscarClasseUseCase,
    {
      provide: BuscarClassePort,
      useClass: BuscarClasseAdapter,
    },
    BuscarCondicaoMedicaUseCase,
    {
      provide: BuscarCondicaoMedicaPort,
      useClass: BuscarCondicaoMedicaAdapter,
    },
    InserirCondicaoMedicaUseCase,
    {
      provide: InserirCondicaoMedicaPort,
      useClass: InserirCondicaoMedicaAdapter,
    },
    DeletarCondicaoMedicaUseCase,
    {
      provide: DeletarCondicaoMedicaPort,
      useClass: DeletarCondicaoMedicaAdapter,
    },
    EditarCondicaoMedicaUseCase,
    {
      provide: EditarCondicaoMedicaPort,
      useClass: EditarCondicaoMedicaAdapter,
    },
    BuscarFuncaoEventoUseCase,
    {
      provide: BuscarFuncaoEventoPort,
      useClass: BuscarFuncaoEventoAdapter,
    },
    BuscarFuncaoIgrejaUseCase,
    {
      provide: BuscarFuncaoIgrejaPort,
      useClass: BuscarFuncaoIgrejaAdapter,
    },
    BuscarInstrumentoUseCase,
    {
      provide: BuscarInstrumentoPort,
      useClass: BuscarInstrumentoAdapter,
    },
    InserirInstrumentoUseCase,
    { provide: InserirInstrumentoPort, useClass: InserirInstrumentoAdapter },
    DeletarInstrumentoUseCase,
    { provide: DeletarInstrumentoPort, useClass: DeletarInstrumentoAdapter },
    EditarInstrumentoUseCase,
    { provide: EditarInstrumentoPort, useClass: EditarInstrumentoAdapter },
    InserirInscricaoUseCase,
    { provide: InserirInscricaoPort, useClass: InserirInscricaoAdapter },
    DeletarInscricaoUseCase,
    { provide: DeletarInscricaoPort, useClass: DeletarInscricaoAdapter },
    EditarInscricaoUseCase,
    { provide: EditarInscricaoPort, useClass: EditarInscricaoAdapter },
    BuscarRegiaoUseCase,
    { provide: BuscarRegiaoPort, useClass: BuscarRegiaoAdapter },
    ValidarUsuarioUseCase,
    { provide: ValidarUsuarioPort, useClass: ValidarUsuarioAdapter },
    BuscarEventoUseCase,
    { provide: BuscarEventoPort, useClass: BuscarEventoAdapter },
    BuscarIgrejaUseCase,
    { provide: BuscarIgrejaPort, useClass: BuscarIgrejaAdapter },
    NomePipe,
    BuscarInscricaoUseCase,
    { provide: BuscarInscricaoPort, useClass: BuscarInscricaoAdapter },
    BuscarQrCodeCheckinUseCase,
    { provide: BuscarQrCodeCheckinPort, useClass: BuscarQrCodeCheckinAdapter },
    BuscarQrCodePagamentoUseCase,
    {
      provide: BuscarQrCodePagamentoPort,
      useClass: BuscarQrCodePagamentoAdapter,
    },
    BuscarPeriodoEventoUseCase,
    { provide: BuscarPeriodoEventoPort, useClass: BuscarPeriodoEventoAdapter },
    BuscarUsuarioAdminUseCase,
    { provide: BuscarUsuarioAdminPort, useClass: BuscarUsuarioAdminAdapter }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
