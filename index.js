'use strict';

var iconv = new require('iconv').Iconv('cp949', 'utf8');
var isPlainObject = require('lodash/isPlainObject');
var request = require('request');

function rqkrCallback(err, response, body) {
  try {
    if (response && response.headers['content-type']) {
      if (/charset=(ks_c_5601-1987|euc-kr)/i.test(response.headers['content-type'])) {
        body = iconv.convert(new Buffer(body)).toString();
      }
    }
  }
  catch (e) {
    err = e;
    response = undefined;
    body = undefined;
  }

  this._rqkrOriginalCallback.apply(this, [err, response, body]);
}

var originalInit = request.Request.prototype.init;

request.Request.prototype.init = function (options) {

  // Init may be called again - currently in case of redirects
  if (isPlainObject(options) && this._callback === undefined) {
    this._rqkrOriginalCallback = this.callback;
    this.callback = rqkrCallback;

    if (this.encoding === undefined) {
      // If null, the body is returned as a Buffer.
      this.encoding = null;
    }
  }

  return originalInit.apply(this, [options]);
}

module.exports = request;
