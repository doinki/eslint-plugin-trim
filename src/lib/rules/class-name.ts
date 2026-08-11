import { type Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    const options = context.options.at(0) ?? {};
    const { attributes } = {
      attributes: Array.isArray(options.attributes) ? options.attributes : ['className', 'class'],
    };

    return {
      JSXAttribute(node: any) {
        const {
          name: { name },
          value,
        } = node;

        if (!attributes.includes(name) || !value) {
          return;
        }

        trimAllLiterals(context, value, 'className must be trimmed');
      },
    };
  },
  meta: {
    docs: {
      description: 'Disallow leading/trailing whitespace and consecutive spaces in JSX class name attributes',
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/class-name.md',
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
            attributes: {
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
