/**
 * 入口文件
 */

 const Compiler = require('./compiler.js')
 const options = require('../simplepack.config.js')

 new Compiler(options)