/**
 *  代码转AST,再转代码（es6->es5）
 *  分析依赖
 */

const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    getAST: (path) => {
        // 读取文件
        const source = fs.readFileSync(path, 'utf-8')

        return babylon.parse(source, {
            sourceType: 'module',
        })
    },
    // 分析依赖
    getDependencies: (ast) => {
        const dependencies = []
        traverse(ast, {
            // 分析import语句
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value)
            }
        })

        return dependencies
    },
    // ast转代码
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            // 可以解析es6等语法
            presets: ['env']
        })

        return code
    }
}