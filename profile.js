/**
 * Copyright 2015 Shape Security, Inc.
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

"use strict";
var parse = function (t, o) {
  return require('./').parseScript(t, o);
};
var fs = require('fs');

function benchmarkParsing(fileName) {
  var source = fs.readFileSync(require.resolve(fileName), 'utf-8');
  var start = Date.now(), N = 100;
  for (var i = 0; i < N; i++) {
    parse(source, { loc: true });
  }
  var time = Date.now() - start;
  console.log((time / N).toFixed(2) + "ms");
}

benchmarkParsing('angular/angular');