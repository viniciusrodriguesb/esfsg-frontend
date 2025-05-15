import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BuscarClasseUseCase } from './core/application/use-cases/buscar-classe.usecase';
import { BuscarClassePort } from './core/domain/ports/buscar-classe.port';
import { ClasseAdapter } from './infrastructure/adapter/classe.adapter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, HttpClientModule],
  providers: [
    BuscarClasseUseCase,
    {
      provide: BuscarClassePort,
      useClass: ClasseAdapter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
