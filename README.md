# [WIP] The Flatfile Component - @flatfile/angular

We've made it really simple for you to get started with Flatfile with our new Flatfile Component. Here's what you'll need to know to get started.

First, install the dependency via npm:

[ WIP ] 
`npm install @flatfile/angular`

This will give you access to the `<flatfile-button />` component as well as the same basic functionality as our Adapter.

## The flatfile-button usage

```ts
import { FlatfileAngularAdapterModule } from '@flatfile/angular';

// Add to your Modules imports: []
imports: [
  FlatfileAngularAdapterModule
]
```

```ts
// Within a Components template use the flatfile-button

@Component({
  template: `
    <flatfile-button
      settings="settings"
      licenseKey="licenseKey"
      customer="customer"
      onData="onDataEvent($event)">
    </flatfile-button>
  `
}) export class MyDemoComponent {
  public settings = {};
  public licenseKey = 'abcd-1234';
  public customer = { userId: '12345' };

  public async onData(results) {
    //
  }

  public onRecordChange(record) {
    //
  }

  public onRecordInit(record) {
    //
  }

  // @question Is this needed?
  // public fieldHooks={{
  //   email: (values) => {
  //     return values.map(([item, index]) => [{ value: item + '@' }, index]);
  //   },
  // }}

  public onCancel() {
    // console.log('cancel');
  }

  // @question Is this needed? It seems only the "text" inside is editable (?)
  // render={(importer, launch) => {
  //   return <a onClick={launch}>updload here</a>;
  // }}
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
