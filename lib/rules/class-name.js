/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    function trimLiteral(data) {
      const { start, end, value } = data;
      const expected = value.trim().replace(/ {2,}/g, ' ');

      if (expected === value) return;

      context.report({
        fix: (fixer) => fixer.replaceTextRange([start + 1, end - 1], expected),
        message: 'className must be trimmed',
        node: data,
      });
    }

    function trimAllLiterals(data) {
      const { type } = data;

      if (type === 'Literal') {
        trimLiteral(data);
      } else if (type === 'JSXExpressionContainer') {
        const { expression } = data;
        const { type } = expression;

        if (type === 'Literal') {
          trimLiteral(expression);
        } else if (type === 'ArrayExpression') {
          const { elements } = expression;

          elements.forEach((element) => {
            trimAllLiterals(element);
          });
        } else if (type === 'ObjectExpression') {
          const { properties } = expression;

          properties.forEach((property) => {
            const { key } = property;

            trimAllLiterals(key);
          });
        }
      }
    }

    return {
      JSXAttribute(node) {
        const {
          name: { name },
          value: data,
        } = node;

        if (name !== 'className' || !data) return;

        trimAllLiterals(data);
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
