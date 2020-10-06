import CustomerObject from '@flatfile/adapter/build/main/obj.customer';

import { ISettings } from './settings';

export interface AngularAdapterOptions {
  licenseKey: string;
  settings: ISettings;
  customer: CustomerObject;
}
