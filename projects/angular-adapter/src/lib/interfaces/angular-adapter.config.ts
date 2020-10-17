import { FieldHookCallback } from '@flatfile/adapter';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { IDictionary, ScalarDictionaryWithCustom } from './general';

export interface FlatfileMethods {
  onCancel?: () => void;
  onData?: (results: FlatfileResults) => Promise<string | void>;
  onRecordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  onRecordInit?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  fieldHooks?: IDictionary<FieldHookCallback>;
}
