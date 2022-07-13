const patterns = ['ClassName$'];

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    const { options = { patterns } } = context;

    return {
      VariableDeclaration(node) {
        const { declarations } = node;

        declarations.forEach((declaration) => {
          const { id, init } = declaration;

          if (!init) return;

          const { name } = id;
          const { type, value } = init;

          if (type !== 'Literal') return;

          context.report({
            message: 'Identifier ' + JSON.stringify(name),
            node: id,
          });
          context.report({
            message: 'Literal ' + JSON.stringify(value),
            node: init,
          });
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'Enforce `string`',
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-trim/blob/main/docs/rules/variables.md',
    },
    fixable: 'code',
    type: 'suggestion',
  },
};
