import { Injectable } from '@angular/core';
import FlatfileImporter from '@flatfile/adapter';
@Injectable({
  providedIn: 'root'
})
export class FlatFileImporterService extends FlatfileImporter { }
