import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlatfileAdapterModule } from 'projects/angular-adapter/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlatfileAdapterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
