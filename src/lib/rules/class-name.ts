import type { Rule } from 'eslint';

import trimAllLiterals from '../helpers/trimAllLiterals';

const className: Rule.RuleModule = {
  create(context) {
    return {
      JSXAttribute(node: any) {
        const {
          name: { name },
          value,
        } = node;

        if (name !== 'className' || !value) {
          return;
        }

        trimAllLiterals(context, value);
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