import React from 'react';
import ReactDOM from 'react-dom';

export default class ComponentList extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
  }

  render() {

    return (
      <div>
        <h2>ComponentList 列表显示页面</h2>
        <p> 传递的参数: {this.props.params.id}</p>
      </div>
    )
  }
}
