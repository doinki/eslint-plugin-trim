# eslint-plugin-trim

## Installation

```bash
# npm
npm install -D eslint-plugin-trim

# yarn
yarn add -D eslint-plugin-trim

# pnpm
pnpm add -D eslint-plugin-trim
```

## Configuration (legacy: `.eslintrc\*`)

```json
{
  "plugins": ["trim"],
  "rules": {
    "trim/argument": "warn",
    "trim/class-name": "warn"
  }
}
```

or

```json
{
  "extends": ["plugin:trim/recommended"]
}
```

## Configuration (new: `eslint.config.js`)

```js
import trim from 'eslint-plugin-trim';

export default [trim.configs.flat.recommended];
```

## List of supported rules

✔️: Enabled in the recommended configuration.\
🔧: Fixable with eslint --fix.

| ✔️  | 🔧  | Rule                                                                                          | Description       |
| :-: | :-: | :-------------------------------------------------------------------------------------------- | :---------------- |
|     | 🔧  | [argument](https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/argument.md)     | Enforce argument  |
|     | 🔧  | [class-name](https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/class-name.md) | Enforce className |
