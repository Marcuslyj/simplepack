/**
 * 模块构建
 * 文件输出
 */

const { getAST, getDependencies, transform } = require('./parser')
const path = require('path')
const fs = require('fs')

module.exports = class Compiler {

    constructor(options) {
        const { entry, output } = options
        this.entry = entry
        this.output = output
        this.modules = []
    }

    run() {
        const entryModule = this.buildModule(this.entry, true)
        // 入口模块添加进modules
        this.modules.push(entryModule)

        // 遍历modules
        this.modules.map((_module) => {
            _module.dependencies.map((dependency) => {
                this.modules.push(this.buildModule(dependency))
            })
        })

        this.emitFiles()
    }

    /**
     * 模块构建
     */
    buildModule(filename, isEntry) {
        let ast

        if (isEntry) {
            // 入口文件是绝对路径
            ast = getAST(filename)
        } else {
            // 相对路径转绝对路径
            let absolutePath = path.join(process.cwd(), './src', filename)
            ast = getAST(absolutePath)
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    /**
     * 输出文件
     */
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename)

        let modules = ''

        this.modules.map(_module => {
            modules += `'${_module.filename}':function(require, module, exports){${_module.source}},`
        })

        const bundle = `(function(modules){
            function require(filename){
                var fn = modules[filename];
                var module = {exports:{}}

                fn(require, module, module.exports);
                return module.exports;
            }

            require('${this.entry}')
        })({${modules}})`

        console.log('====================================');
        console.log(bundle);
        console.log('====================================');

        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }
}