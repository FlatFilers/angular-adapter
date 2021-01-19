/**
 * @note Public API Surface of angular-adapter
 */

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import { default as CustomerObject } from '@flatfile/adapter/build/main/obj.customer';
import { default as FlatfileResults } from '@flatfile/adapter/build/main/results';

export * from './lib/flatfile-adapter.module';
export * from './lib/flatfile-button.component';
export * from './lib/interfaces';
export { CustomerObject, FlatfileImporter, FlatfileResults, FieldHookCallback };
