# Changelog

### 1.1.2

Exported `FlatfileCustomer` interface.
`ISettings` and renamed to `FlatfileSettings`.
### 1.1.1

Improved Flatfile configuration object to provide `licenseKey | settings | customer` objects and type definitions.

### 1.0.2

Fixed import for FlatfileResults to come from @flatfile/angular library correctly.

### 1.0.0

Breaking Changes:

2-way binding for data, recordInit, recordChange removed.

2-way binding for data, recordInit, recordChange removed.
Methods have been renamed (to avoid confusion) and now need to be passed via 1-way binding, utilizing `.bind(this)` which will ensure parent component classes context. (Incase users need to call internal methods/properties/etc from within their component class).

Previously:

```html
[(data)]="onData"
[(recordInit)]="onRecordInit"
[(recordChange)]="onRecordChange"
```

Now, the methods have `on` prepending the name, and are 1-way binding *Input*'s.

```html
[onData]="onData.bind(this)"
[onRecordInit]="onRecordInit.bind(this)"
[onRecordChange]="onRecordChange.bind(this)"
```
