import { type Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    const options = context.options.at(0) ?? {};

    const { callees } = {
      callees: Array.isArray(options.callees)
        ? options.callees
        : ['cn', 'cva', 'twJoin', 'twMerge', 'clsx'],
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
    schema: {
      type: 'array',
      minItems: 0,
      maxItems: 1,
      items: [
        {
          type: 'object',
          properties: {
            callees: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          additionalProperties: false,
        },
      ],
    },
    type: 'suggestion',
  },
};

export default className;
