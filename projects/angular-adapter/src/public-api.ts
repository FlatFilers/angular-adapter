/**
 * @note Public API Surface of angular-adapter
 */

import FlatfileImporter, {
  FieldHookCallback,
  CustomerObject as FlatfileCustomer,
  FlatfileResults,
  IDataHookResponse,
} from '@flatfile/adapter';

export * from './lib/flatfile-adapter.module';
export * from './lib/flatfile-button.component';
export * from './lib/interfaces';

export {
  FlatfileCustomer,
  FlatfileImporter,
  FlatfileResults,
  FieldHookCallback,
  IDataHookResponse,
};
