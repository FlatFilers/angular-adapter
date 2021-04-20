import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import FlatfileImporter, {
  FieldHookCallback,
  CustomerObject as FlatfileCustomer,
  LoadOptionsObject,
  FlatfileResults,
} from '@flatfile/adapter';

import { RecordInitOrChangeCallback } from './interfaces/general';
import { FlatfileSettings } from './interfaces/settings';

@Component({
  selector: 'flatfile-button',
  template: `
    <button (click)="launch()" [disabled]="!isImporterLoaded">
      <div #ref [class.hide]="!isImporterLoaded">
        <ng-content></ng-content>
      </div>
      <span *ngIf="!ref && !ref.innerHTML.trim() && isImporterLoaded"
        >🔼 Upload with Flatfile</span
      >
      <span *ngIf="!isImporterLoaded">
        🅧 Failed to Load Flatfile Importer
      </span>
    </button>
  `,
  styles: [
    `
      .hide {
        display: none;
      }
    `,
  ],
})
export class FlatfileButtonComponent implements OnInit, OnDestroy {
  @Input() settings: FlatfileSettings;
  @Input() licenseKey: string;
  @Input() customer: FlatfileCustomer;
  @Input() fieldHooks?: Record<string, FieldHookCallback>;
  @Input() mountUrl?: string;
  @Input() onData?: (results: FlatfileResults) => Promise<string | void>;
  @Input() onRecordInit?: RecordInitOrChangeCallback;
  @Input() onRecordChange?: RecordInitOrChangeCallback;
  @Input() source?: LoadOptionsObject['source'];

  @Output() cancel?: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('ref', { read: ElementRef, static: true }) ref: ElementRef;

  isImporterLoaded: boolean = true;

  private flatfileImporter: FlatfileImporter;

  public ngOnInit(): void {
    this.validateInputs();

    if (this.mountUrl) {
      FlatfileImporter.setMountUrl(this.mountUrl);
    }

    this.flatfileImporter = new FlatfileImporter(
      this.licenseKey,
      this.settings,
      this.customer
    );

    this.flatfileImporter.registerNetworkErrorCallback((res) => {
      console.error(`[Error] Flatfile Angular Adapter - Network Error`);
    });

    if (this.fieldHooks) {
      for (const key in this.fieldHooks) {
        if (key) {
          this.flatfileImporter.registerFieldHook(key, this.fieldHooks[key]);
        }
      }
    }
    if (this.onRecordChange || this.onRecordInit) {
      this.flatfileImporter.registerRecordHook(
        async (record: any, index: number, eventType: string) => {
          if (eventType === 'init' && this.onRecordInit) {
            return await this.onRecordInit(record, index);
          }
          if (eventType === 'change' && this.onRecordChange) {
            return await this.onRecordChange(record, index);
          }
        }
      );
    }
  }

  public ngOnDestroy(): void {
    this.flatfileImporter.close();
  }

  public launch(): void {
    const dataHandler = (results: FlatfileResults) => {
      this.flatfileImporter?.displayLoader();

      if (this.onData) {
        this.onData(results).then(
          (optionalMessage?: string | void) => {
            this.flatfileImporter?.displaySuccess(
              optionalMessage || 'Success!'
            );
          },
          (error: any) => {
            console.error(`Flatfile Error : ${error}`);
            this.flatfileImporter
              ?.requestCorrectionsFromUser(
                error instanceof Error ? error.message : error
              )
              .then(dataHandler, () => this.cancel.next());
          }
        );
      } else {
        this.flatfileImporter?.displaySuccess('Success!');
      }
    };

    if (!this.flatfileImporter) {
      this.isImporterLoaded = false;
      console.error('[Error] Flatfile Angular Adapter - Failed to initialize');
      return;
    }
    const loadOptions: LoadOptionsObject | undefined = this.source
      ? { source: this.source }
      : undefined;
    this.flatfileImporter
      .requestDataFromUser(loadOptions)
      .then(dataHandler, () => this.cancel.next());
  }

  private validateInputs(): void {
    if (!this.licenseKey) {
      console.error(
        '[Error] Flatfile Angular Adapter - licenseKey not provided!'
      );
      this.isImporterLoaded = false;
    }
    if (!this.customer?.userId) {
      console.error(
        '[Error] Flatfile Angular Adapter - customer userId not provided!'
      );
      this.isImporterLoaded = false;
    }
  }
}
