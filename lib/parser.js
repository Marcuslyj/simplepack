/**
 *  代码转AST,再转代码（es6->es5）
 *  分析依赖
 */

const fs = require('fs')
const babylon = require('babylon')

module.exports = {
    getAST: (path) => {
        // 读取文件
        const source = fs.readFileSync(path, 'utf-8')

        return babylon.parse(source, {
            sourceType: 'module',
        })
    }
}