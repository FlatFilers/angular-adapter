import { FieldHookCallback } from '@flatfile/adapter';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { IDictionary, RecordInitOrChangeCallback } from './general';

export interface FlatfileMethods {
  onCancel?: () => void;
  onData?: (results: FlatfileResults) => Promise<string | void>;
  onRecordChange?: RecordInitOrChangeCallback;
  onRecordInit?: RecordInitOrChangeCallback;
  fieldHooks?: IDictionary<FieldHookCallback>;
}
