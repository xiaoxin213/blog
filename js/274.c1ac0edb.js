(window.webpackJsonp=window.webpackJsonp||[]).push([[274],{926:function(n,e){n.exports="### title\n\nGiven a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.\n\nYou should preserve the original relative order of the nodes in each of the two partitions.\n\nExample:\n\n```js\nInput: head = 1->4->3->2->5->2, x = 3\nOutput: 1->2->2->4->3->5\n```\n\n### Analyze\n\n思路: 遍历访问链表 head, 将链表中小于 x 与大于等于 x 的值作拆分成两个链表, 最后再将它们给链接起来。\n\n* 易漏点: 大于等于 x 的链表的末尾的 next 应该指向 null。\n\n```js\n/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} x\n * @return {ListNode}\n */\nvar partition = function(head, x) {\n  const listNode = new ListNode(0)\n  listNode.next = head\n\n  const smallerThanX = new ListNode(0)\n  const biggerThanX = new ListNode(0)\n\n  let cur = listNode.next\n  let smallPoint = smallerThanX\n  let bigPoint = biggerThanX\n  while (cur) {\n    if (cur.val < x) {\n      smallPoint.next = cur\n      smallPoint = smallPoint.next\n    } else {\n      bigPoint.next = cur\n      bigPoint = bigPoint.next\n    }\n\n    cur = cur.next\n  }\n\n  bigPoint.next = null\n  smallPoint.next = biggerThanX.next\n\n  return smallerThanX.next\n}\n```"}}]);