import { Component, ViewEncapsulation } from '@angular/core';
import {
  FieldHookCallback,
  FlatfileMethods,
  ScalarDictionaryWithCustom,
  FlatfileResults,
  IDataHookResponse,
} from 'projects/angular-adapter/src/public-api';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flatfile Angular button sample</h1>

    <flatfile-button
      [settings]="settings"
      [customer]="customer"
      [licenseKey]="licenseKey"
      [fieldHooks]="fieldHooks"
      [onData]="onData.bind(this)"
      [onRecordInit]="onRecordInit.bind(this)"
      [onRecordChange]="onRecordChange.bind(this)"
      (cancel)="onCancel()"
      class="flatfile-button"
    >
      This text is coming from the end-user of this component
    </flatfile-button>

    <br /><br />

    <div *ngIf="results">
      <strong>Results coming back from Flatfile:</strong>
      {{ results | json }}
    </div>
  `,
  /**
   * @note Important if you want to style the child component
   * from this "parent" component
   */
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .flatfile-button button {
        border: 0;
        border-radius: 3px;
        padding: 1rem;
        background: #794cff;
        color: #fff;
      }
    `,
  ],
})
export class AppComponent implements FlatfileMethods {
  customer = { userId: '12345' };
  /**
   * @NOTE - PLACE YOUR FLATFILE LICENSE KEY HERE
   * 👇👇👇
   */
  licenseKey = 'YOUR_LICENSE_KEY_HERE';

  settings = {
    type: 'test import',
    fields: [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
    ],
  };

  results;

  /*
   * @Input()'s
   */
  fieldHooks: Record<string, FieldHookCallback> = {
    email: (values) => {
      return values.map(([item, index]) => [
        {
          value: item + '@',
          info: [{ message: 'added @ after the email', level: 'warning' }],
        },
        index,
      ]);
    },
  };

  onData(results: FlatfileResults): Promise<string> {
    let errorState = false;

    console.log('onData()');
    console.log(results.data);

    this.results = results.data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (errorState) {
          reject('rejected - this text is controlled by the end-user');
          errorState = false;
        } else {
          resolve(
            'Flatfile upload successful - this text is controlled by the end-user'
          );
        }
      }, 3000);
    });
  }

  onRecordInit(
    record: ScalarDictionaryWithCustom,
    index: number
  ): IDataHookResponse | Promise<IDataHookResponse> {
    console.log('onRecordInit()');
    console.log(record);

    return {
      email: {
        value: record.email + '@',
        info: [{ message: 'added @ on init', level: 'info' }],
      },
    };
  }

  onRecordChange(
    record: ScalarDictionaryWithCustom,
    index: number
  ): IDataHookResponse | Promise<IDataHookResponse> {
    console.log('onRecordChange()');
    console.log(record);

    return {
      email: {
        value: record.email + '#',
        info: [{ message: 'added # on change', level: 'warning' }],
      },
    };
  }

  /*
   * @Output() handlers
   */
  onCancel(): void {
    console.log('canceled!');
  }
}
