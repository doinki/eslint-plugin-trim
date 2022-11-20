import type { BaseNode, Expression } from 'estree';

interface JSXEmptyExpression extends BaseNode {
  type: 'JSXEmptyExpression';
}

interface JSXExpressionContainer extends BaseNode {
  type: 'JSXExpressionContainer';
  expression: Expression | JSXEmptyExpression;
}

export type ExtendedExpression =
  | Expression
  | JSXEmptyExpression
  | JSXExpressionContainer;
