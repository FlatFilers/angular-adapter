import { FieldHookCallback } from '@flatfile/adapter';
import { default as CustomerObject } from '@flatfile/adapter/build/main/obj.customer';
import { default as FlatfileResults } from '@flatfile/adapter/build/main/results';
import { IDictionary, RecordInitOrChangeCallback } from './general';
import { ISettings } from './settings';

export interface FlatfileMethods {
  licenseKey: string;
  customer: CustomerObject;
  settings: ISettings;
  onCancel?: () => void;
  onData?: (results: FlatfileResults) => Promise<string | void>;
  onRecordChange?: RecordInitOrChangeCallback;
  onRecordInit?: RecordInitOrChangeCallback;
  fieldHooks?: IDictionary<FieldHookCallback>;
}
