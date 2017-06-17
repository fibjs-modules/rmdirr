const test = require("test");
const rmdirr = require('../');
const fs = require('fs');
const path = require('path');

test.setup();

const testRoot = path.join(__dirname, 'tmp');
fs.mkdir(testRoot);
const testPath = path.join(testRoot, 'a');
fs.mkdir(testPath);
const testFile = path.join(testPath, 'file');

describe('rmdirr', () => {
  before(() => {
    fs.writeFile(testFile, 'test');
  });

  it('rm dir recursively', () => {
    rmdirr(testRoot);
    assert.notOk(fs.exists(testFile));
    assert.notOk(fs.exists(testRoot));
  });

  it('not throw error when path not exists', () => {
    assert.doesNotThrow(() => rmdirr('123'));
  });
});

test.run(console.DEBUG);
