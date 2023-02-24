import type { Rule } from 'eslint';
import type { Literal } from 'estree';

function trimLiteral(
  context: Rule.RuleContext,
  data: Literal,
  message: string
) {
  const { range, value } = data;

  if (typeof value !== 'string' || !range) {
    return;
  }

  const expected = value.trim().replace(/ {2,}/g, ' ');

  if (expected === value) {
    return;
  }

  context.report({
    fix: (fixer) =>
      fixer.replaceTextRange([range[0] + 1, range[1] - 1], expected),
    message,
    node: data,
  });
}

export default trimLiteral;
