# Changelog

### 1.0.0

Breaking Changes:

2-way binding for data, recordInit, recordChange removed.

Methods now need to be passed via 1-way binding, utilizing `.bind(this)` which will ensure parent component classes context. (Incase users need to call internal methods/properties/etc from within their component class).

Previously:

```html
[(data)]="onData"
[(recordInit)]="onRecordInit"
[(recordChange)]="onRecordChange"
```

Now:

```html
[onData]="onData.bind(this)"
[onRecordInit]="onRecordInit.bind(this)"
[onRecordChange]="onRecordChange.bind(this)"
```
