module.exports = {
  create(context) {
    return {
      JSXAttribute(node) {
        const {
          name: { name },
          value: attribute,
        } = node;

        if (name !== 'className' || !attribute) {
          return;
        }

        const { raw, type, value } = attribute;

        if (type === 'Literal') {
          const delimeter = raw.charAt(0);
          const expected = value.trim().replace(/ {2,}/g, ' ');

          if (expected === value) {
            return;
          }

          context.report({
            fix: (fixer) =>
              fixer.replaceText(
                attribute,
                `${delimeter}${expected}${delimeter}`
              ),
            message: 'className must be trimmed',
            node: attribute,
          });
        }

        // TODO: JSXExpressionContainer
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
