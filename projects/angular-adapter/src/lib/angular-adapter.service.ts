import { Inject, Injectable } from '@angular/core';
import FlatfileImporter from '@flatfile/adapter';

import { ANGULAR_ADAPTER_OPTIONS } from './constants/angular-adapter.constants';
import { AngularAdapterOptions } from './interfaces/angular-adapter-options';

@Injectable({
  providedIn: 'root'
})
export class FlatFileImporterService {
  public importer = new FlatfileImporter(
    this.angularAdapterOptions.licenseKey,
    this.angularAdapterOptions.settings,
    this.angularAdapterOptions.customer
  );

  constructor(
    @Inject(ANGULAR_ADAPTER_OPTIONS) private angularAdapterOptions: AngularAdapterOptions
  ) {}
}
