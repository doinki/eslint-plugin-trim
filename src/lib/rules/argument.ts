import type { Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    const options = context.options.at(0) ?? {};

    const { callees } = {
      callees: Array.isArray(options.callees)
        ? options.callees
        : ['classNames', 'clsx', 'tw', 'twJoin', 'twMerge'],
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
