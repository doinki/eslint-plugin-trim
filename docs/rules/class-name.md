# trim/class-name

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div className=" ">...</div>

<div className="flex ">...</div>

<div className=" flex">...</div>

<div className="flex  items-center">...</div>

<div className={isTrue() ? 'flex ' : ' items-center'}>...</div>

<div className={isTrue() && 'flex '}>...</div>

<div className={clsx('flex ', ' items-center')}>...</div>

<div className={clsx([['flex '], ' items-center'])}>...</div>

<div className={clsx({ 'flex ': true })}>...</div>

<div className={`flex ${isTrue() ? 'items-center ' : ' justify-center'}`}>
  ...
</div>
```

Examples of **correct** code for this rule:

```jsx
<div className="">...</div>

<div className="flex">...</div>

<div className="flex items-center">...</div>

<div className={isTrue() ? 'flex' : 'items-center'}>...</div>

<div className={isTrue() && 'flex'}>...</div>

<div className={clsx('flex', 'items-center')}>...</div>

<div className={clsx([['flex'], 'items-center'])}>...</div>

<div className={clsx({ 'flex': true })}>...</div>

<div className={`flex ${isTrue() ? 'items-center' : 'justify-center'}`}>
  ...
</div>
```

## Rule Options

```js
"trim/class-name": [<enabled>, { "attributes": Array<string> }]
```

### `attributes` (default: ["class", "className"])

Examples of **incorrect** code for `{ attributes: ["className", "class"] }` option:

```jsx
<div className=" ">...</div>

<div class=" ">...</div>
```

Examples of **correct** code for `{ attributes: ["className", "class"] }` option:

```jsx
<div className="">...</div>

<div class="">...</div>
```
