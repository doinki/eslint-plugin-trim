import { RuleTester } from 'eslint';

import argument from '../src/lib/rules/argument';

const ERROR = { message: 'String argument must be trimmed', type: 'Literal' };

const ruleTester = new RuleTester();

ruleTester.run('argument', argument, {
  invalid: [
    {
      code: `clsx(" ")`,
      errors: [ERROR],
      output: `clsx("")`,
    },
    {
      code: `clsx(' ')`,
      errors: [ERROR],
      output: `clsx('')`,
    },
    {
      code: `clsx(...arg, " ")`,
      errors: [ERROR],
      output: `clsx(...arg, "")`,
    },
  ],
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
});
