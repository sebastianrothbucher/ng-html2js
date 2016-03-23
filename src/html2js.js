/**
 * DISCLAIMER: Core logic was copied from https://github.com/karma-runner/karma-ng-html2js-preprocessor.
 * Since karma-ng-html2js-preprocessor was designed specifically for karma,
 * I modified it to create a standalone script.
 */

/* globals module */
'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');



//
// Constants
//

var TMPL = fs.readFileSync(path.join(__dirname, './template.tmpl'), 'utf-8');
var SINGLE_MODULE_TMPL = fs.readFileSync(path.join(__dirname, './singleModule.tmpl'), 'utf-8');


//
// Helper
//

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};


//
// Main script
//

module.exports = function (fileName, content, moduleName) {
  var escapedContent = escapeContent(content);

  var output = null;
  if (moduleName) {
    output = util.format(SINGLE_MODULE_TMPL,
        moduleName,
        moduleName,
        moduleName,
        fileName, escapedContent);
  } else {
    output = util.format(TMPL, moduleName, fileName, escapedContent);
  }

  return output;
};
