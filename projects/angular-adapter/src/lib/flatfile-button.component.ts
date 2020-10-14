import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { FLATFILE_IMPORTER } from './constants/flatfile-importer.constants';

import { IDictionary, ScalarDictionaryWithCustom } from './interfaces/general';
import { Record } from './interfaces/record.interface';

@Component({
  selector: 'flatfile-button',
  template: `
    <button (click)="launch()"></button>
  `,
  styles: [],
  providers: []
})
export class FlatfileButtonComponent implements OnInit, OnDestroy {

  @Input() fieldHooks?: IDictionary<FieldHookCallback>;
  @Input() onData: Promise<any>;

  @Output() cancel = new EventEmitter<void>();
  // @Output() data: (results: FlatfileResults) => Promise<string | void>;

  @Output() data = new EventEmitter<any>();

  @Output() recordInit = new EventEmitter<Record>();
  @Output() recordChange = new EventEmitter<Record>();

  // @Output() recordChange?: (
  //   data: ScalarDictionaryWithCustom,
  //   index: number
  // ) => IDataHookResponse | Promise<IDataHookResponse>;
  // @Output() recordInit?: (
  //   data: ScalarDictionaryWithCustom,
  //   index: number
  // ) => IDataHookResponse | Promise<IDataHookResponse>;

  constructor(
    @Inject(FLATFILE_IMPORTER) private flatfileImporter: FlatfileImporter
  ) {}

  ngOnInit(): void {
    const tempImporter = this.flatfileImporter;

    if (this.fieldHooks) {
      for (const key in this.fieldHooks) {
        if (key) {
          tempImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.recordChange || this.recordInit) {
      // @question What are these used for, can these be moved inside the flatfileImporter perhaps?
      // @ts-ignore
      tempImporter.registerRecordHook((record, index, eventType) => {
        console.log('registerRecordHook');
        console.log(record, index, eventType);
        if (eventType === 'init' && this.recordInit) {
          console.log({ data: record, index });
          return this.recordInit.next({ data: record, index });
        }
        if (eventType === 'change' && this.recordChange) {
          console.log({ data: record, index });
          return this.recordChange.next({ data: record, index });
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
    console.log('launch hit');
    const dataHandler = (results: FlatfileResults) => {
      this.flatfileImporter?.displayLoader();

      console.log('inside dataHandler');
      console.log({results});

      this.data.next(results);

      this.flatfileImporter?.displaySuccess('Success!');
      // this.data?.(results).then(
      //   (optionalMessage?: string | void) => {
      //     console.log('on success');
      //     this.flatfileImporter?.displaySuccess(optionalMessage || 'Success!');
      //   },
      //   (error: any) => {
      //     console.log('error =>', error)
      //     this.flatfileImporter?.requestCorrectionsFromUser(
      //         error instanceof Error ? error.message : error
      //       )
      //       .then(dataHandler, () => {
      //         console.log('then inside dataHandler');
      //         this.cancel.next();
      //       });
      //   }
      // );
    };

    if (!this.flatfileImporter) {
      return;
    }
    this.flatfileImporter.requestDataFromUser().then(dataHandler, () => this.cancel.next());
  }

}
