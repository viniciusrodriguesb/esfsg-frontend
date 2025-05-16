import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { BuscarEventoUseCase } from './core/application/use-cases/funcao/buscar-evento.usecase';
import { BuscarIgrejaUseCase } from './core/application/use-cases/funcao/buscar-igreja.usecase';
import { BuscarEventoPort } from './core/domain/ports/funcao/buscar-evento.port';
import { BuscarIgrejaPort } from './core/domain/ports/funcao/buscar-igreja.port';
import { BuscarEventoAdapter } from './infrastructure/adapter/funcao/buscar-evento.adapter';
import { BuscarIgrejaAdapter } from './infrastructure/adapter/funcao/buscar-igreja.adapter';
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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, HttpClientModule],
  providers: [
    BuscarClasseUseCase,
    { provide: BuscarClassePort, useClass: BuscarClasseAdapter },
    BuscarCondicaoMedicaUseCase,
    { provide: BuscarCondicaoMedicaPort, useClass: BuscarCondicaoMedicaAdapter },
    InserirCondicaoMedicaUseCase,
    { provide: InserirCondicaoMedicaPort, useClass: InserirCondicaoMedicaAdapter },
    DeletarCondicaoMedicaUseCase,
    { provide: DeletarCondicaoMedicaPort, useClass: DeletarCondicaoMedicaAdapter },
    EditarCondicaoMedicaUseCase,
    { provide: EditarCondicaoMedicaPort, useClass: EditarCondicaoMedicaAdapter },
    BuscarEventoUseCase,
    { provide: BuscarEventoPort, useClass: BuscarEventoAdapter },
    BuscarIgrejaUseCase,
    { provide: BuscarIgrejaPort, useClass: BuscarIgrejaAdapter },
    BuscarInstrumentoUseCase,
    { provide: BuscarInstrumentoPort, useClass: BuscarInstrumentoAdapter },
    InserirInstrumentoUseCase,
    { provide: InserirInstrumentoPort, useClass: InserirInstrumentoAdapter },
    DeletarInstrumentoUseCase,
    { provide: DeletarInstrumentoPort, useClass: DeletarInstrumentoAdapter },
    EditarInstrumentoUseCase,
    { provide: EditarInstrumentoPort, useClass: EditarInstrumentoAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
