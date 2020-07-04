(window.webpackJsonp=window.webpackJsonp||[]).push([[370],{1022:function(n,e){n.exports="### 富文本编辑器的层级\n\n* L0\n* L1: 兼容性层面的优化, 自行实现 undo/redo 栈;\n* L2: 移动端/国际化适配;\n\n> 一个好的框架设计: 尽量少的提前做的假设限制!\n\n#### L0\n\n1. 给元素上加上 `contenteditable` 属性\n2. 给选中元素执行 `document.execCommand()`\n\n> 另外一种方法是内嵌 iframe, 并将其 designmode 属性设置为 true。(有跨域问题, 日后填坑)\n\n### Slate 框架\n\n### 调试\n\n可以使用 `editor.value.toJSON()` 打印 tree 结构, 便于调试;\n\n### slate 设计模式\n\n* 兜底原则\n  * `normalizeNode`, 除指定节点外都走该 normalize 机制;\n\n### 有序列表的设计\n\n1. 小圆点 + 数字作为一个结构;\n2. 点击有序列表, 当前节点的同级兄弟节点都会变为有序列表;\n3. 点击可以取消有序列表;\n4. 当在有序列表的节点建立兄弟节点或子节点时, 自动设置为有序列表;\n5. 子节点规则 1 —— 1.1 —— 1.1.1 —— 1.1.1.1;\n6. 当把某个子节点从有序节点变为无序节点时, 该节点的兄弟节点也变为无序; 该节点的子节点从 1 开始计数;\n7. 原则: 兄弟节点必须都为有序或无序, 子节点可以无序也可以有序;\n\n结论:\n\n1. 因此对 selection 是不敏感的, 即操作一个都会同时对同层级所有节点生效;\n\n### slate 开发坑点\n\n* 一种方式开发完之后, 在某些情况下是不满足的, 因此需要返工。\n  * example: 输入 @、# 进行筛选最初是使用 set 方式实现的, 一开始这样设计是没问题的, 但是考虑未来在多人协作过程中会造成一份数据的互相影响, 因此将其重构调整为将筛选的数据绕开 set 的方式, 取而代之的是外面传递进来。\n\n### small tip\n\nsmall tip in slate editor\n\nWhen input b after a in page #slate #editor.\n\n```js\nconsole.log(editor.value.texts.get(0))   //  'a';\n\nrequestAnimationFrame(() => {\n  console.log(editor.value.texts.get(0)) // 'ab'\n})\n```\n\n### link\n\n* [编辑器初体验](https://zhuanlan.zhihu.com/p/90931631)"}}]);