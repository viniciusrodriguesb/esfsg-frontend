import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
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
  Moon,
  Banknote,
  Menu,
  Info,
  Search,
  BrushCleaning,
  CircleGauge,
  CalendarCheck,
  Receipt,
  UsersRound,
  ListChecks,
  CircleUserRound,
  LogOut,
  MessageCircleCode,
  House,
  RotateCcw,
  Hourglass,
  LoaderCircle,
  Send,
  FileChartColumnIncreasing,
  PenLine,
  Funnel,
  MapPinHouse,
  EllipsisVertical,
  Lock,
} from 'lucide-angular';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from '../app-routing.module';
import { CpfPipe } from '../presentation/pipes/cpf.pipe';
import { NomeAbreviadoPipe } from '../presentation/pipes/nome-abreviado.pipe';
import { NomePipe } from '../presentation/pipes/nome.pipe';
import { TelefonePipe } from '../presentation/pipes/telefone.pipe';
import { CustomButtonComponent } from '../presentation/ui/botoes/custom-button/custom-button.component';
import { HeaderComponent } from '../presentation/ui/header/header.component';
import { InputComponent } from '../presentation/ui/input/input.component';
import { LoadingComponent } from '../presentation/ui/loading/loading.component';
import { ResultadoNaoEncontradoComponent } from '../presentation/ui/resultado-nao-encontrado/resultado-nao-encontrado.component';
import { SidebarComponent } from '../presentation/ui/sidebar/sidebar.component';
import { SnackbarComponent } from '../presentation/ui/snackbar/snackbar.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { LoadingInterceptor } from '../infrastructure/interceptors/loading.interceptor';
import player from 'lottie-web';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InputComponent,
    SnackbarComponent,

    HeaderComponent,

    CustomButtonComponent,
    SidebarComponent,

    LoadingComponent,
    ResultadoNaoEncontradoComponent,
  ],
  imports: [
    CommonModule,
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
      Moon,
      Banknote,
      Menu,
      Info,
      Search,
      BrushCleaning,
      CircleGauge,
      CalendarCheck,
      Receipt,
      UsersRound,
      ListChecks,
      CircleUserRound,
      LogOut,
      MessageCircleCode,
      House,
      RotateCcw,
      Hourglass,
      LoaderCircle,
      Send,
      FileChartColumnIncreasing,
      PenLine,
      Funnel,
      MapPinHouse,
      EllipsisVertical,
      Lock,
    }),
    SweetAlert2Module.forRoot(),

    ZXingScannerModule,

    // Angular Material Modules
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatMenuModule,

    // Pipes
    NomeAbreviadoPipe,
    NomePipe,
    CpfPipe,
    TelefonePipe,
  ],
  providers: [
    provideLottieOptions({ player: () => player }),
    provideHttpClient(withInterceptorsFromDi()),

    NomePipe,
    NomeAbreviadoPipe,
    CpfPipe,
    TelefonePipe,

    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  exports: [
    ReactiveFormsModule,
    InputComponent,
    SnackbarComponent,

    HeaderComponent,

    CustomButtonComponent,
    SidebarComponent,

    LoadingComponent,
    ResultadoNaoEncontradoComponent,

    // Angular Material Modules
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatMenuModule,

    // Pipes
    NomeAbreviadoPipe,
    NomePipe,
    CpfPipe,
    TelefonePipe,

    LucideAngularModule,
    LottieComponent,

    ZXingScannerModule,
    SweetAlert2Module,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    LottieComponent,
    NgxMaskModule,
    RouterOutlet
  ],
})
export class SharedModule {}
