import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared.module';
import { FeatureModule } from './modules/feature.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, FeatureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
