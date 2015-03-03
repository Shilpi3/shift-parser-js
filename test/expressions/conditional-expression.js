/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Shift = require("shift-ast");

var expr = require("../helpers").expr;
var testParse = require("../assertions").testParse;

suite("Parser", function () {
  suite("conditional expression", function () {

    testParse("a?b:c", expr,
      { type: "ConditionalExpression",
        test: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "a" } },
        consequent: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "b" } },
        alternate: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "c" } } }
    );

    testParse("y ? 1 : 2", expr,
      { type: "ConditionalExpression",
        test: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "y" } },
        consequent: { type: "LiteralNumericExpression", value: 1 },
        alternate: { type: "LiteralNumericExpression", value: 2 } }
    );

    testParse("x && y ? 1 : 2", expr,
      { type: "ConditionalExpression",
        test:
          { type: "BinaryExpression",
            operator: "&&",
            left: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "x" } },
            right: { type: "IdentifierExpression", identifier: { type: "Identifier", name: "y" } } },
        consequent: { type: "LiteralNumericExpression", value: 1 },
        alternate: { type: "LiteralNumericExpression", value: 2 } }
    );

    testParse("x = (0) ? 1 : 2", expr,
      new Shift.AssignmentExpression(
        "=",
        new Shift.BindingIdentifier(new Shift.Identifier("x")),
        new Shift.ConditionalExpression(
          new Shift.LiteralNumericExpression(0),
          new Shift.LiteralNumericExpression(1),
          new Shift.LiteralNumericExpression(2)
        )
      )
    );
  });
});