import * as path from 'path';
const rimraf = require('rimraf');
import test from 'ava';
import {runWebpackCompiler} from './utils.js';

const simpleConfig = require('../examples/simple/webpack.config.js');
const simpleExamplePath = path.resolve(__dirname, '../examples/simple');

test.beforeEach(async t => {
    rimraf.sync(path.resolve(simpleExamplePath, './dist'));
    t.context.stats = await runWebpackCompiler(simpleConfig);
});

// Run
test('webpack should run successfully', async t => {
  const stats = t.context.stats;
  console.log("ENTRYPOINTS PROPERTY", Object.keys(stats));
  t.truthy(stats)
});

test.skip('it should emit a template for each entry point', async t => {
  
});

test.skip('it should emit template into default path', async t => {
  
});

test.skip('each template should have an inline.chunk.js', async t => {
  
});

test.skip('each template should match their entry point', async t => {
  
});

