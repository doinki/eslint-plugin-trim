import { RuleTester } from 'eslint';

import argument from '../src/lib/rules/argument';

(RuleTester as any).setDefaultConfig({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

const ruleTester = new RuleTester();

ruleTester.run('class-name', argument, {
  valid: [
    `classNames("")`,
    `classNames('')`,
    `clsx("")`,
    `clsx('')`,
    `clsx(...arg, '')`,
    `tw("")`,
    `tw('')`,
    `twJoin("")`,
    `twJoin('')`,
    `twMerge("")`,
    `twMerge('')`,
    `noop(" ")`,
    `noop(' ')`,
  ],
  invalid: [
    {
      code: `clsx(" ")`,
      errors: [
        {
          message: 'String argument must be trimmed',
          type: 'Literal',
        },
      ],
      output: `clsx("")`,
    },
    {
      code: `clsx(' ')`,
      errors: [
        {
          message: 'String argument must be trimmed',
          type: 'Literal',
        },
      ],
      output: `clsx('')`,
    },
    {
      code: `clsx(...arg, " ")`,
      errors: [
        {
          message: 'String argument must be trimmed',
          type: 'Literal',
        },
      ],
      output: `clsx(...arg, "")`,
    },
  ],
});
