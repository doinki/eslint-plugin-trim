# trim/argument

## Rule Details

Examples of **incorrect** code for this rule:

```js
clsx(' ');

clsx([' ']);

clsx(isTrue() && ' ');
```

Examples of **correct** code for this rule:

```js
clsx('');

clsx(['']);

clsx(isTrue() && '');
```

## Rule Options

```js
"trim/argument": [<enabled>, { "callees": Array<string> }]
```

### `callees` (default: ["classNames", "clsx", "tw", "twJoin", "twMerge"])

Examples of **incorrect** code for `{ callees: ["classNames", "clsx", "tw", "twJoin", "twMerge"] }` option:

```js
classNames(' ');

clsx(' ');

tw(' ');

twJoin(' ');

twMerge(' ');
```

Examples of **correct** code for `{ callees: ["classNames", "clsx", "tw", "twJoin", "twMerge"] }` option:

```js
classNames('');

clsx('');

tw('');

twJoin('');

twMerge('');

noop(' ');
```
