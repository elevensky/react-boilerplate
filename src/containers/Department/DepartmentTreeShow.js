import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import * as treeOperation from '../../helpers/treeOperation';
import * as departmentActions from '../../redux/modules/department/index';
const NodeWidth = 200;
const NodeHeight = 100;

@connect(
  state => ({department: state.department}),
  departmentActions
)
export default class DepartmentTreeShow extends Component {

  static propTypes = {
    department: PropTypes.object,
  };

  componentDidMount() {
    this.props.getDepartmentTree();
  }

  draw() {
    const departmentsTree = this.props.department.get('departmentsTree').toJS();
    if (!departmentsTree.id) {
      console.log('not departmentsTree data', departmentsTree);
      return;
    }
    const canvas = this.refs.canvas;
    if (!canvas) {
      console.log('not find canvas');
      return;
    }

    /*
     * 整体划分几个步骤
     * 1：复制一个树
     * 2：计算树的最大深度、最大宽度，计算canvas的宽度和高度
     * 3：计算div其实的坐标点，计算上下连接点
     * 4：绘制图形（canvas、或者svg)
     * 5：导出图形
     * */
    // 1:复制出一个副本
    const tree = treeOperation.copy(departmentsTree, (data) => {
      const newNode = {};
      newNode.id = data.id;
      newNode.name = data.name;
      newNode.eeLeaderName = data.eeLeader.name;
      newNode.eeLeaderId = data.eeLeader.id;
      newNode.eeLeaderAvatar = data.eeLeader.avatar;
      newNode.positionSum = data.positionSum;
      newNode.employesSum = data.employesSum;
      return newNode;
    }, 'children');

    // 2:计算树的最大深度和最大宽度
    let maxDepth = 0;
    let maxWidth = 0;
    const treeArray = [];
    const visit = (parent) => {
      if (!parent) {
        return;
      }
      if (!treeArray[parent.depth]) {
        treeArray[parent.depth] = [];
      }
      treeArray[parent.depth].push(parent);
      if (parent.children && parent.children.length) {
        parent.children.map((item) => {
          item.parent = parent;
          item.depth = parent.depth + 1;
          visit(item, item.depth);
        });
      }
    };
    tree.depth = 0;
    visit(tree);
    treeArray.map(item => {
      maxWidth = maxWidth > item.length ? maxWidth : item.length;
    });
    maxDepth = treeArray.length;
    console.log('tree maxDepth, maxWidth, treeArray ', maxDepth, maxWidth, treeArray);
    // 计算canvas的大小
    const canvasWidth = maxWidth * NodeWidth * 3 / 2;
    const canvasHeight = maxDepth * NodeHeight * 2;
    console.log('canvasWidth canvasHeight', canvasWidth, canvasHeight);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    // 计算div的坐标
    treeArray.map((item, level) => {
      if (item.length === 1) {
        item[0].x = canvasWidth / 2 - NodeWidth / 2;
        item[0].y = NodeHeight * (1 / 4 + level * 3 / 2 );
      } else {
        const divideWidth = canvasWidth / item.length;
        item.map((subItem, index) => {
          subItem.x = divideWidth * index + (divideWidth - NodeWidth) / 2;
          subItem.y = NodeHeight * (1 / 4 + level * 3 / 2 );
        });
      }
    });
    // 绘制矩形
    treeArray.map(item => {
      item.map(subItem => {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(subItem.x, subItem.y, NodeWidth, NodeHeight);
      });
    });
    // 绘制连接线
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    treeArray.map(item => {
      item.map(subItem => {
        if (subItem.children.length) {
          ctx.fillRect(subItem.x, subItem.y, NodeWidth, NodeHeight);
        }
        const parent = subItem.parent;
        if (parent) {
          ctx.moveTo(parent.x + NodeWidth / 2, parent.y + NodeHeight);
          ctx.lineTo(parent.x + NodeWidth / 2, parent.y + NodeHeight + NodeHeight / 4);
          ctx.lineTo(subItem.x + NodeWidth / 2, subItem.y - NodeHeight / 4);
          ctx.lineTo(subItem.x + NodeWidth / 2, subItem.y);
          ctx.stroke();
        }
      });
    });
    // 绘制数据
    treeArray.map(item => {
      item.map(subItem => {
        // 绘制头像
        const img = new Image();
        img.src = '/image/avatar.jpg';
        img.onload = () => {
          ctx.drawImage(img, subItem.x, subItem.y, NodeWidth / 2, NodeHeight);
        };
        // 绘制部门名称
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.fillText(subItem.name, subItem.x + NodeWidth / 2 + 10, subItem.y + 20);
        ctx.font = '10px Arial';
        ctx.fillText('负责人:' + subItem.eeLeaderName, subItem.x + NodeWidth / 2 + 10, subItem.y + 40);
        ctx.fillText('职位(' + subItem.positionSum + ')',
          subItem.x + NodeWidth / 2 + 10, subItem.y + 60);
        ctx.fillText('人数(' + subItem.employesSum + ')',
          subItem.x + NodeWidth / 2 + 10, subItem.y + 80);
      });
    });
  }

  render() {
    this.draw();
    return (
      <div>
        <div>
          <Button type="primary" onClick={() => {
            const canvas = this.refs.canvas;
            if (!canvas) {
              console.log('not find canvas');
              return;
            }
            const imgData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const saveFile = (data, filename) => {
              const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
              saveLink.href = data;
              saveLink.download = filename;
              const event = document.createEvent('MouseEvents');
              event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              saveLink.dispatchEvent(event);
            };
            saveFile(imgData, '部门结构图.png');
          }}>
            导出结构图
          </Button>
        </div>
        <div>
          <canvas ref="canvas">
          </canvas>
        </div>
      </div>);
  }
}
