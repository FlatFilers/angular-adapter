import { ModuleWithProviders, NgModule } from '@angular/core';

import { FlatfileButtonComponent } from './angular-adapter.component';
import { ANGULAR_ADAPTER_OPTIONS } from './constants/angular-adapter.constants';
import { AngularAdapterOptions } from './interfaces/angular-adapter-options';

@NgModule({
  declarations: [FlatfileButtonComponent],
  imports: [],
  exports: [FlatfileButtonComponent],
})
export class FlatfileAngularAdapterModule {
  forRoot(options: AngularAdapterOptions): ModuleWithProviders<FlatfileAngularAdapterModule> {
    return {
      ngModule: FlatfileAngularAdapterModule,
      providers: [
        {
          provide: ANGULAR_ADAPTER_OPTIONS,
          useValue: options,
        }
      ]
    };
  }
}
