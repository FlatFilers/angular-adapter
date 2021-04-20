import {
  IDataHookResponse,
  IPrimitive,
  Nullable,
  ScalarDictionary,
} from '@flatfile/adapter';

export type ScalarDictionaryWithCustom = {
  $custom?: ScalarDictionary;
  [key: string]: Nullable<IPrimitive> | ScalarDictionary;
};

export type RecordInitOrChangeCallback = (
  data: ScalarDictionaryWithCustom,
  index: number
) => IDataHookResponse | Promise<IDataHookResponse>;
