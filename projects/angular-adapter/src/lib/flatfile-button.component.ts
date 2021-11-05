import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { flatfileImporter, IFlatfileImporter } from '@flatfile/sdk';
import { FlatfileMethods } from './interfaces';

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
  @Input() token: string;
  @Input() onInit?: FlatfileMethods['onInit'];
  @Input() onLaunch?: FlatfileMethods['onLaunch'];
  @Input() onClose?: FlatfileMethods['onClose'];
  @Input() onComplete?: FlatfileMethods['onComplete'];
  @Input() onError?: Function;

  @ViewChild('ref', { read: ElementRef, static: true }) ref: ElementRef;

  isImporterLoaded: boolean = true;

  private flatfileImporter: IFlatfileImporter;

  public ngOnInit(): void {
    if (!this.token) {
      console.error('Flatfile Importer ERROR - "token" missing via @Input()');
      this.isImporterLoaded = false;
      return;
    }

    if (typeof flatfileImporter === 'undefined') {
      console.log('Flatfile Importer ERROR - importer failed to load');
      this.isImporterLoaded = false;
      return;
    }

    this.flatfileImporter = flatfileImporter(this.token);

    if (typeof this.onInit === 'function') {
      this.flatfileImporter.on('init', this.onInit);
    }
    if (typeof this.onLaunch === 'function') {
      this.flatfileImporter.on('launch', this.onLaunch);
    }
    if (typeof this.onClose === 'function') {
      this.flatfileImporter.on('close', this.onClose);
    }
    if (typeof this.onComplete === 'function') {
      this.flatfileImporter.on('complete', this.onComplete);
    }
  }

  public ngOnDestroy(): void {
    this.flatfileImporter.close();
  }

  public launch(): void {
    this.flatfileImporter.launch().catch((e: Error) => {
      this.onError?.(e);
    });
  }
}
