import {
  FieldHookCallback,
  CustomerObject as FlatfileCustomer,
  FlatfileResults,
  IDictionary,
} from '@flatfile/adapter';
import { RecordInitOrChangeCallback } from './general';
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
