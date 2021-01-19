import { FieldHookCallback } from '@flatfile/adapter';
import { default as FlatfileCustomer } from '@flatfile/adapter/build/main/obj.customer';
import { default as FlatfileResults } from '@flatfile/adapter/build/main/results';
import { IDictionary, RecordInitOrChangeCallback } from './general';
import { FlatfileSettings } from './settings';

export interface FlatfileMethods {
  licenseKey: string;
  customer: FlatfileCustomer;
  settings: FlatfileSettings;
  onCancel?: () => void;
  onData?: (results: FlatfileResults) => Promise<string | void>;
  onRecordChange?: RecordInitOrChangeCallback;
  onRecordInit?: RecordInitOrChangeCallback;
  fieldHooks?: IDictionary<FieldHookCallback>;
}
