import { type Rule } from 'eslint';

import { type ExtendedExpression } from '../../types';
import trimLiteral from './trimLiteral';

function trimAllLiterals(
  context: Rule.RuleContext,
  data: ExtendedExpression,
  message: string,
) {
  const { type } = data;

  if (type === 'Literal') {
    trimLiteral(context, data, message);
  } else if (type === 'JSXExpressionContainer') {
    trimAllLiterals(context, data.expression, message);
  } else if (type === 'ArrayExpression') {
    data.elements.forEach((element) => {
      if (!element || element.type === 'SpreadElement') {
        return;
      }

      trimAllLiterals(context, element, message);
    });
  } else if (type === 'CallExpression') {
    data.arguments.forEach((arg) => {
      if (arg.type === 'SpreadElement') {
        return;
      }

      trimAllLiterals(context, arg, message);
    });
  } else if (type === 'ConditionalExpression') {
    const { alternate, consequent } = data;

    trimAllLiterals(context, consequent, message);
    trimAllLiterals(context, alternate, message);
  } else if (type === 'LogicalExpression') {
    const { left, right } = data;

    trimAllLiterals(context, left, message);
    trimAllLiterals(context, right, message);
  } else if (type === 'ObjectExpression') {
    data.properties.forEach((property) => {
      if (property.type === 'SpreadElement') {
        return;
      }

      const { key, value } = property;

      if (key.type === 'PrivateIdentifier') {
        return;
      }

      trimAllLiterals(context, key, message);
      trimAllLiterals(context, value, message);
    });
  } else if (type === 'TemplateLiteral') {
    data.expressions.forEach((expression) => {
      trimAllLiterals(context, expression, message);
    });
  }
}

export default trimAllLiterals;
