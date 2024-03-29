# eslint-plugin-trim

## Installation

```bash
# yarn
yarn add -D eslint-plugin-trim

# npm
npm install -D eslint-plugin-trim
```

## Configuration

```json
{
  "plugins": ["trim"],
  "rules": {
    "trim/argument": "error",
    "trim/class-name": "error"
  }
}
```

## List of supported rules

✔️: Enabled in the recommended configuration.\
🔧: Fixable with eslint --fix.

| ✔️  | 🔧  | Rule                                                                                          | Description       |
| :-: | :-: | :-------------------------------------------------------------------------------------------- | :---------------- |
|     | 🔧  | [argument](https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/argument.md)     | Enforce argument  |
|     | 🔧  | [class-name](https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/class-name.md) | Enforce className |
