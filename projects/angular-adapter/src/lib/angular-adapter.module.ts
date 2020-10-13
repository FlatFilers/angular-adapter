import { ModuleWithProviders, NgModule } from '@angular/core';
import FlatfileImporter from '@flatfile/adapter';

import { FlatfileButtonComponent } from './angular-adapter.component';
import { FlatFileImporterService } from './angular-adapter.service';
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
        },
        {
          provide: FlatFileImporterService,
          useFactory: (importerOptions: AngularAdapterOptions) => {
            return new FlatfileImporter(
            importerOptions.licenseKey,
            importerOptions.settings,
            importerOptions.customer
            );
          },
          deps: [ANGULAR_ADAPTER_OPTIONS]
        }
      ]
    };
  }
}
