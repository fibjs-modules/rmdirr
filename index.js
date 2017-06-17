const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = function rmdirr(p) {
  if (!util.isString(p)) {
    throw new TypeError('Path must be a string.');
  }

  if (!fs.exists(p))
    return;

  const fl = fs.readdir(p);

  if (fl.length > 0) {
    fl.forEach(s => {
      if (s !== '.' && s !== '..') {
        const real = path.join(p, s);
        const stat = fs.stat(real);
        if (stat.isDirectory()) {
          rmdirr(real);
        } else if (stat.isFile()) {
          fs.unlink(real);
        }
      }
    });
  }
  fs.rmdir(p);
};
