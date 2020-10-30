# Flatfile Angular Component - @flatfile/angular

We've made it really simple for you to get started with Flatfile with our new Flatfile Component. Here's what you'll need to know to get started.

First, install the dependency via npm:

`npm install @flatfile/angular`

This will give you access to the `<flatfile-button />` component as well as the same basic functionality as our Adapter.

## Getting Started with <flatfile-button>

```ts
import { FlatfileAdapterModule } from '@flatfile/angular';

// Add to your Modules imports: []
imports: [
  FlatfileAdapterModule
]
```

```ts
// Within a Components template use the flatfile-button

@Component({
  template: `
    <flatfile-button
      [settings]="settings"
      [customer]="customer"
      [licenseKey]="licenseKey"
      [fieldHooks]="fieldHooks"
      [(data)]="onData"
      [(recordInit)]="onRecordInit"
      [(recordChange)]="onRecordChange"
      (cancel)="onCancel()">
      This text is coming from the end-user of this component
    </flatfile-button>
  `
}) export class MyDemoComponent {
  
  customer = { userId: '12345' };
  licenseKey = '4171f0b4-5f5c-4b32-a008-356ebb813e4e';
  settings = {
    type: 'test import',
    fields: [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
    ],
  };

  /*
   * @Input()'s
   */
  public fieldHooks: Record<string, FieldHookCallback> = {
    email: (values) => {
      return values.map(([item, index]) => [
        { value: item + '@', info: [{message: 'added @ after the email', level: 'warning'}] },
        index
      ]);
    }
  };

  /*
   * 2-way binding handlers
   */
  onData(results: FlatfileResults): Promise<string> {
    let errorState = false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (errorState) {
          reject('rejected - this text is controlled by the end-user');
          errorState = false;
        } else {
          resolve('Flatfile upload successful - this text is controlled by the end-user');
        }
      }, 3000);
    });
  }

  onRecordInit(record: ScalarDictionaryWithCustom, index: number): IDataHookResponse | Promise<IDataHookResponse> {
    return {
      email: {
        value: record.email + '@',
        info: [{ message: 'added @ on init', level: 'info' }]
      }
    };
  }

  onRecordChange(record: ScalarDictionaryWithCustom, index: number): IDataHookResponse | Promise<IDataHookResponse> {
    return {
      email: {
        value: record.email + '#',
        info: [{ message: 'added # on change', level: 'warning' }]
      }
    };
  }

  /*
   * @Output() handlers
   */
  onCancel(): void {
    console.log('canceled!');
  }
}



```

| **<u>flatfile-button options</u>**                                                                                         | **<u>Info</u>**               | <u>**Example**</u>                     |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------- |
| `settings` - This is where you will pass your [Flatfile settings/options](https://developers.flatfile.io/docs/options). | **Required. ** <br />_object_ | `settings={{ `<br /> `type: "Customers", fields: [` <br /> `{key: "name", label: "Name"}, {key: "email", label: "Email"}`<br />`]}}` |
|`customer` - Refers to the _[setCustomer function](https://developers.flatfile.io/docs/sdk/classes/flatfileimporter#setcustomer)_. | **Required**. <br /> _object_ - [_CustomerObject_](https://developers.flatfile.io/docs/sdk/interfaces/customerobject) | `customer={{` <br />`usedId: "1234",`<br />`companyId: "12",`<br />` companyName: "ABC",`<br />`email: "john@doe.com",`<br />`name: "John Doe"`<br />`}}`|
|`licenseKey` - Your Flatfile license key can be found in your dashboard when you [login here](https://app.flatfile.io/login).|**Required**. <br /> _string_ | `licenseKey={'ah12-alksjs2738-shdkaj123'}` |
|`onCancel` - An optional callback for handling a user cancelling.|Optional. <br /> _function - callback_| `onCancel={() => { // do something }}`|
|`onData`- An optional way to use [FlatfileResults](https://developers.flatfile.io/docs/sdk/classes/flatfileresults) to return a new Promise.|Optional. <br />_function_| `onData={async results => // do something}`|
|`onRecordChange`- An optional way to use [registerRecordHook](https://developers.flatfile.io/docs/datahooks#record-hooks-row-hooks) when a record changes.| Optional. <br /> _function_ |`onRecordChange={(data, index) => `[`IDataHookResponse`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse) &#124; `Promise<`[`IDataHookResponse`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`>}`|
|`onRecordInit`- An optional way to use [registerRecordHook](https://developers.flatfile.io/docs/datahooks#record-hooks-row-hooks) on initialization.|Optional. <br />_function_|_`onRecordInit={(data, index) => `[`IDataHookResponse`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse) &#124; `Promise<`[`IDataHookResponse`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse)`>}`_|
|`fieldHooks`- An optional way to pass in one or more callback functions to use with [registerFieldHook](https://developers.flatfile.io/docs/datahooks#field-hooks-column-hooks).|Optional. <br />object function(s) - callback(s)|`fieldHooks={`<br />`fieldName: (values) => { return // [`[`IDataHookRecord`](https://developers.flatfile.io/docs/sdk/interfaces/idatahookresponse/)`, index][]}`|
|`render`- An optional way to pass in your own elements to render inside the FlatfileButton Component.|Optional. <br />function |`render={`<br />`(`[`FlatfileImporter`](https://developers.flatfile.io/docs/sdk/classes/flatfileimporter)`, `[`launch`](https://github.com/FlatFilers/react-adapter/blob/master/src/components/FlatFileButton.tsx#L83)`) => return ReactElement}`|

Try our example in [CodesandBox](https://codesandbox.io/s/react-flatfile-component-5l4le).
