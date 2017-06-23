import React from 'react';

export default class BodyChild extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
    this.state = {
      username: 'Confidence'
    }
  }
  render() {

    return (
      <div>
        <p>子页面输入: <input type="text" onChange={this.props.handleChildValChanged}/></p>
      </div>
    )
  }
}
