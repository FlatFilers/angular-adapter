import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

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
    <button *ngIf="importerLoaded; else failedLoading" (click)="launch()">
      <ng-content #ref></ng-content>
      <span *ngIf="ref && !ref.innerHTML.trim()">🔼 Upload with Flatfile</span>
    </button>

    <ng-template #failedLoading>
      Failed to load importer
    </ng-template>
  `,
  styles: [``],
  providers: []
})
export class FlatfileButtonComponent implements OnInit, OnDestroy {

  @ViewChild('ref', { static: true }) ref: HTMLElement;

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

  public importerLoaded = true;

  private flatfileImporter: FlatfileImporter;

  constructor() {}

  ngOnInit(): void {
    this.validateInputs();

    const tempImporter = new FlatfileImporter(this.licenseKey, this.settings, this.customer);

    if (this.fieldHooks) {
      for (const key in this.fieldHooks) {
        if (key) {
          tempImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.recordChange || this.recordInit) {
      tempImporter.registerRecordHook((record, index, eventType) => {
        if (eventType === 'init' && this.recordInit) {
          this.recordInitChange.next({ data: record, index });
        }
        if (eventType === 'change' && this.recordChange) {
          this.recordChangeChange.next({ data: record, index });
        }
      });
    }
    this.flatfileImporter = tempImporter;
  }

  ngOnDestroy(): void {
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
      this.importerLoaded = false;
      return;
    }
    this.flatfileImporter.requestDataFromUser().then(dataHandler, () => this.cancel.next());
  }

  private validateInputs(): void {
    if (!this.licenseKey) {
      console.error('[Error] Flatfile Angular Adapter - licenseKey not provided!');
      this.importerLoaded = false;
    }
    if (!this.customer?.userId) {
      console.error('[Error] Flatfile Angular Adapter - customer userId not provided!');
      this.importerLoaded = false;
    }
  }

}
