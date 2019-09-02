/**
 * 模块构建
 * 文件输出
 */

module.exports = class Compiler {

    constructor(options) {
        const { entry, output } = options
        this.entry = entry
        this.output = output
    }

    run() { }

    /**
     * 模块构建
     */
    buildModule() { }

    /**
     * 输出文件
     */
    emitFiles() { }
}