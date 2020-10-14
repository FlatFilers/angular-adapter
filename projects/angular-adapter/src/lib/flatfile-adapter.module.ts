import { ModuleWithProviders, NgModule } from '@angular/core';
import FlatfileImporter from '@flatfile/adapter';

import { FlatfileButtonComponent } from './flatfile-button.component';
import { ANGULAR_ADAPTER_OPTIONS } from './constants/angular-adapter.constants';
import { FLATFILE_IMPORTER } from './constants/flatfile-importer.constants';
import { AngularAdapterOptions } from './interfaces/angular-adapter-options';

@NgModule({
  declarations: [FlatfileButtonComponent],
  imports: [],
  exports: [FlatfileButtonComponent],
})
export class FlatfileAdapterModule {
  static forRoot(options: AngularAdapterOptions): ModuleWithProviders<FlatfileAdapterModule> {
    console.log('forRoot');
    console.log({options});
    return {
      ngModule: FlatfileAdapterModule,
      providers: [
        {
          provide: ANGULAR_ADAPTER_OPTIONS,
          useValue: options,
        },
        {
          provide: FLATFILE_IMPORTER,
          useFactory: (importerOptions: AngularAdapterOptions) => {
            console.log('USE FACTORY')
            console.log({importerOptions});
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
