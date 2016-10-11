var MemoryFS = require('memory-fs');
var Promise = require('bluebird');
var webpack = require('webpack');
var rimraf = require('rimraf');

var fs = require('fs');
var path = require('path');

exports.runWebpackCompiler = function runWebpackCompiler(config, options) {
  const compiler = webpack(config);
  
  const outputfs = compiler.outputFileSystem = new MemoryFS();
  const readdir = Promise.promisify(outputfs.readdir, {context: outputfs});
  const readFile = Promise.promisify(outputfs.readFile, {context: outputfs});
  const stat = Promise.promisify(outputfs.stat, {context: outputfs});
  const fsReaddir = Promise.promisify(fs.readdir, {context: fs});
  const fsReadFile = Promise.promisify(fs.readFile, {context: fs});
  const fsStat = Promise.promisify(fs.stat, {context: fs});
  const run = Promise.promisify(compiler.run, {context: compiler});

  return run()
  // .then(function(stats) {
  //   return Promise.all([
  //     readdir(compiler.options.output.path)
  //     .map(function(name) {
  //       var fullname = path.join(compiler.options.output.path, name);
  //       return stat(fullname)
  //       .then(function(stat) {
  //         if (stat.isFile()) {
  //           return readFile(fullname)
  //           .then(function(file) {return [name, file];});
  //         }
  //       });
  //     }),
  //     fsReaddir(compiler.options.output.path)
  //     .map(function(name) {
  //       var fullname = path.join(compiler.options.output.path, name);
  //       return fsStat(fullname)
  //       .then(function(stat) {
  //         if (stat.isFile()) {
  //           return fsReadFile(fullname)
  //           .then(function(file) {return [name, file];});
  //         }
  //       });
  //     }),
  //   ])
  // });
};