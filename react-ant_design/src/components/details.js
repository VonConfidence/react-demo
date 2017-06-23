import React from 'react';
import ReactDOM from 'react-dom';

export default class ComponentDetail extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
  }

  render() {

    return (
      <div>
        <h2>ComponentDetail 测试</h2>
      </div>
    )
  }
}
