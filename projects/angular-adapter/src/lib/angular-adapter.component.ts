import { Component, Input, OnInit, Output } from '@angular/core';

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';

import { IDictionary, ScalarDictionaryWithCustom } from './interfaces/general';
import { ISettings } from './interfaces/settings';

@Component({
  selector: 'flatfile-button',
  template: `
    <!-- @todo pass down props -->
    <button (click)="launch()"></button>
  `,
  styles: [
  ]
})
export class FlatfileButtonComponent implements OnInit {

  @Input()
  settings: ISettings;
  @Input()
  licenseKey: string;
  @Input()
  customer: CustomerObject;
  @Input()
  fieldHooks?: IDictionary<FieldHookCallback>;

  @Output()
  cancel: () => void;
  @Output()
  data: (results: FlatfileResults) => Promise<string | void>;
  @Output()
  recordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  @Output()
  recordInit?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;

  private importer: FlatfileImporter;

  ngOnInit(): void {
    const tempImporter = new FlatfileImporter(
      this.licenseKey,
      this.settings,
      this.customer
    );

    if (this.fieldHooks) {
      for (const key in this.fieldHooks) {
        if (key) {
          tempImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.recordChange || this.recordInit) {
      // @ts-ignore
      tempImporter.registerRecordHook((record, index, eventType) => {
        if (eventType === 'init' && this.recordInit) {
          return this.recordInit(record, index);
        }
        if (eventType === 'change' && this.recordChange) {
          return this.recordChange(record, index);
        }
      });
    }
    this.importer = tempImporter;
  }

  public launch(): void {
    const dataHandler = (results: FlatfileResults) => {
      this.importer?.displayLoader();
      this.data?.(results).then(
        (optionalMessage?: string | void) => {
          this.importer?.displaySuccess(optionalMessage || 'Success!');
        },
        (error: any) =>
          this.importer
            ?.requestCorrectionsFromUser(
              error instanceof Error ? error.message : error
            )
            .then(dataHandler, () => this.cancel())
      );
    };

    if (!this.importer) {
      return;
    }
    this.importer.requestDataFromUser().then(dataHandler, () => this.cancel());
  }

}
