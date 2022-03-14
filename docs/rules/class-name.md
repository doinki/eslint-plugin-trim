# trim/class-name

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div className=" ">...</div>

<div className="flex ">...</div>

<div className=" flex">...</div>

<div className="flex  items-center">...</div>
```

Examples of **correct** code for this rule:

```jsx
<div className="">...</div>

<div className="flex">...</div>

<div className="flex items-center">...</div>
```
