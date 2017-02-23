/*
 * 树结构
 * {
 *   id:'123',
 *   children:[
 *     {
 *      id:'1',
 *      children:[
 *        {
 *          id:'4',
 *          children:[]
 *        },
 *
 *      ]
 *     },
 *     {
 *      id:'2',
 *      children:[]
 *    },
 *   ]
 * }
 * */

/*
 * 复制一个树的结构，返回一个新的树结构
 * 新的树结构，如果有子节点，属性名为 children
 * func 为复制回调函数，返回一个新对象
 * */
export function copy(tree, func, children = 'children') {
  const result = {};
  if (!tree) {
    return result;
  }
  const __loop = (data, res) => {
    const newNode = func(data);
    if (!newNode.children) {
      newNode.children = [];
    }
    if (res instanceof Array) {
      res.push(newNode);
    } else {
      if (!res.children) {
        res.children = [];
      }
      Object.assign(res, newNode);
    }
    if (data[children] && data[children].length) {
      data[children].map(item => {
        __loop(item, newNode.children);
      });
    }
  };
  __loop(tree, result);
  return result;
}

/*
 * 查找一个树的节点
 * 返回第一个符合要求的节点
 * func为比较函数，返回true为匹配上，false不匹配
 *
 */

export function find(tree, func, children = 'children') {
  if (!tree) {
    return null;
  }
  const __loop = (data) => {
    if (func(data)) {
      return data;
    }

    if (data[children] && data[children].length) {
      for (let index = 0; index < data[children].length; index++) {
        const result = __loop(data[children][index]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  return __loop(tree);
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
  const __loop = (data, index, level) => {
    func(data, index, level);
    if (data[children] && data[children].length) {
      data[children].map((item, subIndex) => {
        __loop(item, subIndex, level + 1);
      });
    }
  };
  __loop(tree, 0, 0);
  return null;
}
