import { type Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    const options = context.options.at(0) ?? {};
    const { attributes } = {
      attributes: Array.isArray(options.attributes)
        ? options.attributes
        : ['className', 'class'],
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
      description: 'Enforce `className`',
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/class-name.md',
    },
    fixable: 'code',
    type: 'suggestion',
  },
};

export default className;
