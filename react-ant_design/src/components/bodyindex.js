import React from 'react';
import ReactDOM from 'react-dom';

import { Input } from 'antd';

export default class BodyIndex extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
    this.state = {
      username: 'Confidence'
    }
  }

  render() {

    return (
      <div>
        <h2>页面的主题内容</h2>
        <Input placeholder="Basic usage" />
      </div>
    )
  }
}
