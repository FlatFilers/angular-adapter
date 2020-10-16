/*
 * Public API Surface of angular-adapter
 */

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import * as FlatfileResults from '@flatfile/adapter/build/main/results';
import { ISettings as FlatfileSettings } from './lib/interfaces/settings';

export * from './lib/flatfile-button.component';
export * from './lib/flatfile-adapter.module';

export { FlatfileImporter, FlatfileResults, FlatfileSettings, FieldHookCallback };
