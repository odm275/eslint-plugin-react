/**
 * @fileoverview Prevent missing React when using JSX
 * @author Glen Mailer
 */
'use strict';

const variableUtil = require('../util/variable');
const pragmaUtil = require('../util/pragma');

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing React when using JSX',
      category: 'Possible Errors',
      recommended: true
    },
    schema: []
  },

  create: function(context) {
    const pragma = pragmaUtil.getFromContext(context);
    const NOT_DEFINED_MESSAGE = '\'{{name}}\' must be in scope when using JSX';

    return {

      JSXOpeningElement: function(node) {
        const variables = variableUtil.variablesInScope(context);
        if (variableUtil.findVariable(variables, pragma)) {
          return;
        }
        context.report({
          node: node,
          message: NOT_DEFINED_MESSAGE,
          data: {
            name: pragma
          }
        });
      }

    };
  }
};
