/**
 * @note Public API Surface of angular-adapter
 */

import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import { default as FlatfileCustomer } from '@flatfile/adapter/build/main/obj.customer';
import { default as FlatfileResults } from '@flatfile/adapter/build/main/results';

export * from './lib/flatfile-adapter.module';
export * from './lib/flatfile-button.component';
export * from './lib/interfaces';
export { FlatfileCustomer, FlatfileImporter, FlatfileResults, FieldHookCallback };
