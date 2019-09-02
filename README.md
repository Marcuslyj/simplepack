# simplepack
实现一个简单的webpack







目录

lib：simplepack代码

src：项目代码

simplepack.config.js： 配置文件







目标：

1. es6语法转es语法
   - 通过babylon生成AST
   - 通过babel-core将AST重新生成源码
2. 可以分析模块之间的依赖关系
   - 通过babel-traverse的importDeclaration方法获取依赖属性
3. 生成的js 文件可以在浏览器运行











































