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

Examples of **incorrect** code for `{ callees: ["cn", "twJoin", "twMerge", "clsx"] }` option:

```js
cn(' ');

twJoin(' ');

twMerge(' ');

clsx(' ');
```

Examples of **correct** code for `{ callees: ["cn", "twJoin", "twMerge", "clsx"] }` option:

```js
cn('');

twJoin('');

twMerge('');

clsx('');

noop(' ');
```
