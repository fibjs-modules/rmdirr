const fs = require('fs');
const path = require('path');

module.exports = function rmdirr(p) {
  if (typeof p !== 'string') {
    throw new TypeError('Path must be a string.');
  }
  let fl = fs.readdir(p);
  if (fl.length > 0) {
    fl.forEach(s => {
      if (s.name !== '.' && s.name !== '..') {
        let real = path.join(p, s.name);
        if (s.isDirectory()) {
          rmdirr(real);
        } else if (s.isFile()) {
          fs.unlink(real);
        }
      }
    });
  }
  fs.rmdir(p);
};
