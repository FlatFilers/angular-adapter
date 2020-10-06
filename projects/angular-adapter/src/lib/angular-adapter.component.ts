import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { FlatFileImporterService } from './angular-adapter.service';

import { IDictionary, ScalarDictionaryWithCustom } from './interfaces/general';
import { ISettings } from './interfaces/settings';

@Component({
  selector: 'flatfile-button',
  template: `
    <button (click)="launch()"></button>
  `,
  styles: [],
  providers: [FlatFileImporterService]
})
export class FlatfileButtonComponent implements OnInit, OnDestroy {

  @Input() settings: ISettings;
  @Input() licenseKey: string;
  @Input() customer: CustomerObject;
  @Input() fieldHooks?: IDictionary<FieldHookCallback>;

  @Output() cancel: () => void;
  @Output() data: (results: FlatfileResults) => Promise<string | void>;
  @Output() recordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  @Output() recordInit?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;

  private importer: FlatfileImporter;

  constructor(
    private flatFileImporterService: FlatFileImporterService
  ) {}

  ngOnInit(): void {
    const tempImporter = this.flatFileImporterService.importer;

    if (this.fieldHooks) {
      for (const key in this.fieldHooks) {
        if (key) {
          tempImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.recordChange || this.recordInit) {
      // @question What are these used for, can these be moved inside the FlatFileImporterService perhaps?
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

  ngOnDestroy(): void {
    // @question Is there anything we need/should do when the component is being destroyed?
    this.importer.close();
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
