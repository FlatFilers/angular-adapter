import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlatfileAngularAdapterModule } from 'projects/angular-adapter/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlatfileAngularAdapterModule.forRoot({
      customer: { userId: '12345' },
      licenseKey: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
      settings: {
        type: 'test import',
        fields: [
          { label: 'Name', key: 'name' },
          { label: 'Email', key: 'email' },
        ],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
