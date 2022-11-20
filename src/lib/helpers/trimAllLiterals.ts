import type { Rule } from 'eslint';

import type { ExtendedExpression } from '../../types';
import trimLiteral from './trimLiteral';

function trimAllLiterals(context: Rule.RuleContext, data: ExtendedExpression) {
  const { type } = data;

  if (type === 'Literal') {
    trimLiteral(context, data);
  } else if (type === 'JSXExpressionContainer') {
    trimAllLiterals(context, data.expression);
  } else if (type === 'ArrayExpression') {
    data.elements.forEach((element) => {
      if (!element || element.type === 'SpreadElement') {
        return;
      }

      trimAllLiterals(context, element);
    });
  } else if (type === 'CallExpression') {
    data.arguments.forEach((arg) => {
      if (arg.type === 'SpreadElement') {
        return;
      }

      trimAllLiterals(context, arg);
    });
  } else if (type === 'ConditionalExpression') {
    const { consequent, alternate } = data;

    trimAllLiterals(context, consequent);
    trimAllLiterals(context, alternate);
  } else if (type === 'LogicalExpression') {
    const { left, right } = data;

    trimAllLiterals(context, left);
    trimAllLiterals(context, right);
  } else if (type === 'ObjectExpression') {
    data.properties.forEach((property) => {
      if (property.type === 'SpreadElement') {
        return;
      }

      const { key } = property;

      if (key.type === 'PrivateIdentifier') {
        return;
      }

      trimAllLiterals(context, key);
    });
  } else if (type === 'TemplateLiteral') {
    data.expressions.forEach((expression) => {
      trimAllLiterals(context, expression);
    });
  }
}

export default trimAllLiterals;
