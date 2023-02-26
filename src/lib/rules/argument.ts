import type { Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    const { callees } = {
      callees: ['classNames', 'clsx', 'tw', 'twJoin', 'twMerge'],
      ...context.options,
    };

    return {
      CallExpression(node) {
        if (
          node.callee.type !== 'Identifier' ||
          !callees.includes(node.callee.name)
        ) {
          return;
        }

        node.arguments.forEach((arg) => {
          if (arg.type === 'SpreadElement') {
            return;
          }

          trimAllLiterals(context, arg, 'String argument must be trimmed');
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'Enforce `argument`',
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/argument.md',
    },
    fixable: 'code',
    type: 'suggestion',
  },
};

export default className;
