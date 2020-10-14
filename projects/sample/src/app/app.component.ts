import { Component } from '@angular/core';
import FlatfileResults from '@flatfile/adapter/build/main/results';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flatfile Angular button sample</h1>

    <flatfile-button
      (data)="onData($event)"
      (cancel)="onCancel()"
      (recordInit)="onRecordInit($event)"
      (recordChange)="onRecordChange($event)"
      >
      Testing
    </flatfile-button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  async onData(results: FlatfileResults): Promise<string> {
    console.log('App => onData()');
    console.log({results});
    return 'done';
  }

  onCancel(): void {
    console.log('canceled!');
  }

  onRecordInit(event): void {
    console.log('onrecordInit!');
    console.log(event);
  }

  onRecordChange(event): void {
    console.log('onrecordChange!');
    console.log(event);
  }
}
