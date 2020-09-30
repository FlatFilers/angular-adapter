/*
 * Public API Surface of angular-adapter
 */

import * as FlatfileImporter from '@flatfile/adapter';
import * as FlatfileResults from '@flatfile/adapter/build/main/results';

import { ISettings as FlatfileSettings } from './lib/interfaces/settings';

export * from './lib/angular-adapter.service';
export * from './lib/angular-adapter.component';
export * from './lib/angular-adapter.module';

export { FlatfileImporter, FlatfileResults, FlatfileSettings };
