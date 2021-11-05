import { Component, ViewEncapsulation } from '@angular/core';
import {
  FlatfileMethods,
  InitParams,
  LaunchParams,
  CompleteParams,
  ErrorParams,
} from 'projects/angular-adapter/src/public-api';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flatfile Angular button sample</h1>

    <flatfile-button
      [token]="token"
      [onInit]="onInit.bind(this)"
      [onLaunch]="onLaunch.bind(this)"
      [onComplete]="onComplete.bind(this)"
      [onClose]="onClose.bind(this)"
      [onError]="onError.bind(this)"
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
   * @note IMPORTANT if you want to style the child component
   * from this "parent" component
   *
   * @note then access the "button" inside of flatfile-button
   * with css (as shown below)
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
  /**
   * @NOTE - PLACE YOUR FLATFILE LICENSE KEY HERE
   * 👇👇👇
   */
  token = 'YOUR_TOKEN_HERE';

  results;

  /*
   * @Input() methods, make sure they are passed down to <flatfile-button>
   *    via: .bind(this)
   *
   *    for example:
   *      onInit.bind(this)
   */
  onInit(params: InitParams) {
    console.log(`onInit`);
    console.log(params.batchId);
  }
  onLaunch(event: LaunchParams) {
    console.log(`onLaunch`);
    console.log(event);
  }
  onClose() {
    console.log(`onClose`);
  }
  onComplete(event: CompleteParams) {
    console.log(`onComplete`);
    console.log(event.batchId);
    console.log(event.data);

    this.results = event.data;
  }
  onError(event: ErrorParams) {
    console.log(`onError`);
    console.log(event.error);
  }
}
