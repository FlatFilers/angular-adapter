import { Component, ViewEncapsulation } from '@angular/core';
import {
  FlatfileMethods,
  InitParams,
  LaunchParams,
  CompleteParams,
  ErrorParams,
  UploadParams,
} from 'projects/angular-adapter/src/public-api';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flatfile Angular button sample</h1>

    <flatfile-button
      [token]="token"
      [mountUrl]="mountUrl"
      [apiUrl]="apiUrl"
      (onInit)="onInit($event)"
      (onLaunch)="onLaunch($event)"
      (onComplete)="onComplete($event)"
      (onUpload)="onUpload($event)"
      (onError)="onError($event)"
      (onClose)="onClose()"
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
   * @NOTE - Call your backend & retrieve your Token, and pass down the license key
   * 👇👇👇
   */
  token = 'YOUR_TOKEN_HERE';

  /** optional **/
  mountUrl = '';
  /** optional **/
  apiUrl = '';

  results;

  /*
   * @Output() methods, make sure they are passed down to <flatfile-button>
   */
  onInit(params: InitParams) {
    console.log(`onInit`);
    console.log(params.batchId);
  }
  onUpload(event: UploadParams) {
    console.log(`onUpload`);
    console.log(event);
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
