'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = undefined;
exports.default = loader;

var _loaderUtils = require('loader-utils');

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _helper = require('./helper.js');

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loader(content) {
  this.cacheable && this.cacheable();
  var opts = (0, _loaderUtils.getOptions)(this) || {};
  (0, _schemaUtils2.default)(_options2.default, opts, 'Progressive Img Loader');

  var cb = this.async();
  var ifBase64 = opts.base64 || true;
  var file = this.resourcePath;
  var contentString = content.toString('utf8');

  // maybe will change to es2015 module exports
  // https://github.com/webpack-contrib/file-loader/blob/master/src/index.js#L82
  var isFileUrlExport = /^module.exports = (.*)/.test(contentString);

  // https://github.com/webpack-contrib/url-loader/blob/master/src/index.js#L39
  var isDataUrlExport = /^module.exports = "data:(.*)base64,(.*)/.test(contentString);

  var source = "";
  if (isDataUrlExport) {
    source = contentString.match(/^module.exports = (.*)/)[1];
  } else {
    if (!isFileUrlExport) {
      var fileLoader = require('file-loader');
      contentString = fileLoader.call(this, content);
    }
    source = contentString.match(/^module.exports = (.*);/)[1];
  }

  (0, _helper.base64)(file).then(function (data) {
    if (data) {
      var res = 'module.exports = { "src": ' + source;
      if (ifBase64) res += ', "thumbnail": ' + JSON.stringify(data);
      res += '};';
      cb(null, res);
    } else {
      cb(err, null);
    }
  }).catch(function (err) {
    cb(err, null);
  });
}

var raw = exports.raw = true;