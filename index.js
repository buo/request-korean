'use strict';

var request = require('request');
var iconv = new require('iconv').Iconv('cp949', 'utf8');

function rqkrCallback(err, response, body) {
  if (response && response.headers['content-type']) {
    if (/charset=(ks_c_5601-1987|euc-kr)/i.test(response.headers['content-type'])) {
      body = iconv.convert(new Buffer(body)).toString();
    }
  }

  this._rqkrOriginalCallback.apply(this, [err, response, body]);
}

var originalInit = request.Request.prototype.init;

request.Request.prototype.init = function (options) {
  this._rqkrOriginalCallback = this.callback;
  this.callback = rqkrCallback;

  if (this.encoding === undefined) {
    // If null, the body is returned as a Buffer.
    this.encoding = null;
  }

  return originalInit.apply(this, [options]);
}

module.exports = request;
