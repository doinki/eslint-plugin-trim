import { type BaseNode, type Expression, type Pattern } from 'estree';

interface JSXEmptyExpression extends BaseNode {
  type: 'JSXEmptyExpression';
}

interface JSXExpressionContainer extends BaseNode {
  expression: Expression | JSXEmptyExpression;
  type: 'JSXExpressionContainer';
}

export type ExtendedExpression =
  | Expression
  | Pattern
  | JSXEmptyExpression
  | JSXExpressionContainer;
