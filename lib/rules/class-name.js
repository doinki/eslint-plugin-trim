/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    function trimLiteral(data) {
      const { start, end, value } = data;

      if (typeof value !== 'string') return;

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

        trimAllLiterals(expression);
      } else if (type === 'ArrayExpression') {
        const { elements } = data;

        elements.forEach((element) => {
          trimAllLiterals(element);
        });
      } else if (type === 'CallExpression') {
        const { arguments: args } = data;

        args.forEach((arg) => {
          trimAllLiterals(arg);
        });
      } else if (type === 'ConditionalExpression') {
        const { consequent, alternate } = data;

        trimAllLiterals(consequent);
        trimAllLiterals(alternate);
      } else if (type === 'LogicalExpression') {
        const { left, right } = data;

        trimAllLiterals(left);
        trimAllLiterals(right);
      } else if (type === 'ObjectExpression') {
        const { properties } = data;

        properties.forEach((property) => {
          const { key } = property;

          trimAllLiterals(key);
        });
      } else if (type === 'TemplateLiteral') {
        const { expressions } = data;

        expressions.forEach((expression) => {
          trimAllLiterals(expression);
        });
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
