(window.webpackJsonp=window.webpackJsonp||[]).push([[177],{829:function(n,e){n.exports="虽然是一道 easy 难度的题目, 但是可能状态不太好, 下次再重新 A 下。\n\n### Analyze\n\n```js\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {boolean}\n */\nvar isSameTree = function (p, q) {\n  if (p === null && q === null) {\n    return true\n  } else if (p === null || q === null) {\n    return false\n  }\n\n  if (p.val === q.val) {\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)\n  } else {\n    return false\n  }\n};\n\n```"}}]);