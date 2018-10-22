'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Jimp = require('jimp');
var CURR_SUPPORT_MIME = ['image/png', 'image/jpeg', 'image/bmp'];

var base64 = exports.base64 = function base64(file) {
  return new Promise(function (resolve, reject) {
    return Jimp.read(file).then(function (image) {
      return image.resize(10, Jimp.AUTO);
    }).then(function (image) {
      var mimeType = image.getMIME();
      if (!~CURR_SUPPORT_MIME.indexOf(mimeType)) return reject('Error: not support ' + mimeType + ' yet, only support ' + CURR_SUPPORT_MIME.join(',') + ' now');
      return image.getBase64(Jimp.AUTO, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    }).catch(function (error) {
      return reject(error);
    });
  });
};