/*
 * list结构
 * [
 *  {
 *    id:'1',
 *    children:[
 *      {
 *        id:'3',
 *        children:[]
 *      }
 *    ]
 *  },
 *  {
 *    id:'2',
 *    children:[]
 *  },
 * ]
 *
 * */

/*
 * 复制一个list的结构，返回一个新的list结构
 * 新的list结构，如果有子节点，属性名为 children
 * func 为复制回调函数，返回一个新对象
 * */
export function copy(list, func, children = 'children') {
  const result = [];
  if (!list || !(list instanceof Array)) {
    return [];
  }
  const __loop = (data, res) => {
    const newNode = func(data);
    if (!newNode.children) {
      newNode.children = [];
    }
    res.push(newNode);
    if (data && data[children] && data[children].length) {
      data[children].map((item) => {
        __loop(item, newNode.children);
      });
    }
  };
  list.map(item => {
    __loop(item, result);
  });
  return result;
}

/*
 * 查找一个list的节点
 * 返回第一个符合要求的节点
 * func为比较函数，返回true为匹配上，false不匹配
 *
 */

export function find(list, func, children = 'children') {
  if (!list || !(list instanceof Array)) {
    return null;
  }

  const __loop = (data) => {
    if (func(data)) {
      return data;
    }
    if (data && data[children] && data[children].length) {
      for (let index2 = 0; index2 < data[children].length; index2++) {
        const result = __loop(data[children][index2]);
        if (result) {
          return result;
        }
      }
      return null;
    }
  };

  for (let index1 = 0; index1 < list.length; index1++) {
    const result = __loop(list[index1]);
    if (result) {
      return result;
    }
  }
}
/*
 * 查找一个树的节点
 * 返回一个数组，包含符合要求的对象
 * func为比较函数，返回true为匹配上，false不匹配
 *
 */

export function findAll(tree, func, children = 'children') {
  const result = [];
  if (!tree) {
    return result;
  }
  const __loop = (data) => {
    if (func(data)) {
      result.push(data);
    }
    if (data[children] && data[children].length) {
      data[children].map(item => {
        __loop(item);
      });
    }
  };
  __loop(tree);
  return result;
}

/*
 * 遍历一个树的节点
 * func为执行函数
 *
 */

export function loop(tree, func, children = 'children') {
  if (!tree) {
    return null;
  }
  const __loop = (data) => {
    func(data);
    if (data[children] && data[children].length) {
      data[children].map(item => {
        __loop(item);
      });
    }
  };
  __loop(tree);
  return null;
}

