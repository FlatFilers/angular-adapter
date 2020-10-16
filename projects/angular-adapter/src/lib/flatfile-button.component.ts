import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';

import { ScalarDictionaryWithCustom } from './interfaces/general';
import { RowRecord } from './interfaces/row-record.interface';
import { ISettings } from './interfaces/settings';

@Component({
  selector: 'flatfile-button',
  template: `
    <button *ngIf="!failedLoadingImporter; failedLoading" (click)="launch()">
      🔼 Upload with Flatfile
    </button>
    <ng-template #failedLoading>
      Failed to load importer
    </ng-template>
  `,
  styles: [],
  providers: []
})
export class FlatfileButtonComponent implements OnInit, OnDestroy {

  @Input() settings: ISettings;
  @Input() licenseKey: string;
  @Input() customer: CustomerObject;
  @Input() fieldHooks?: Record<string, FieldHookCallback>;

  @Output() cancel = new EventEmitter<void>();

  @Input() data: (results: FlatfileResults) => Promise<string | void>;
  @Output() dataChange = new EventEmitter<any>();

  @Input() recordInit: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  @Output() recordInitChange = new EventEmitter<RowRecord>();

  @Input() recordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  @Output() recordChangeChange = new EventEmitter<RowRecord>();

  public failedLoadingImporter = false;

  private flatfileImporter: FlatfileImporter;

  constructor() {}

  ngOnInit(): void {
    const tempImporter = new FlatfileImporter(this.licenseKey, this.settings, this.customer);

    if (this.fieldHooks) {
      // console.log('\n\n > fieldHooks < ');
      // console.log(this.fieldHooks);
      for (const key in this.fieldHooks) {
        if (key) {
          tempImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.recordChange || this.recordInit) {
      tempImporter.registerRecordHook((record, index, eventType) => {
        // console.log('registerRecordHook');
        // console.log(record, index, eventType);
        if (eventType === 'init' && this.recordInit) {
          console.log({ data: record, index });
          this.recordInitChange.next({ data: record, index });
          console.log(this.recordInit);
          return this.recordInit;
        }
        if (eventType === 'change' && this.recordChange) {
          console.log({ data: record, index });
          this.recordChangeChange.next({ data: record, index });
          console.log(this.recordChange);
          return this.recordChange;
        }
      });
    }
    this.flatfileImporter = tempImporter;
  }

  ngOnDestroy(): void {
    // @question Is there anything we need/should do when the component is being destroyed?
    this.flatfileImporter.close();
  }

  public launch(): void {
    const dataHandler = async (results: FlatfileResults) => {
      this.flatfileImporter?.displayLoader();

      console.log('inside dataHandler');
      console.log({results});

      this.dataChange.next(results);

      this.data?.(results).then(
        (optionalMessage?: string | void) => {
          this.flatfileImporter?.displaySuccess(optionalMessage || 'Success!');
        },
        (error: any) => {
          this.flatfileImporter?.requestCorrectionsFromUser(
              error instanceof Error ? error.message : error
            )
            .then(dataHandler, () => this.cancel.next());
        }
      );
    };

    if (!this.flatfileImporter) {
      this.failedLoadingImporter = true;
      return;
    }
    this.flatfileImporter.requestDataFromUser().then(dataHandler, () => this.cancel.next());
  }

}
