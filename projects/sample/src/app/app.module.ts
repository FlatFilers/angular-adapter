import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlatfileAdapterModule } from 'projects/angular-adapter/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlatfileAdapterModule,

    // .forRoot({
    //   customer: { userId: '12345' },
    //   // licenseKey: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
    //   licenseKey: '4171f0b4-5f5c-4b32-a008-356ebb813e4e',
    //   settings: {
    //     type: 'test import',
    //     fields: [
    //       { label: 'Name', key: 'name' },
    //       { label: 'Email', key: 'email' },
    //     ],
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
