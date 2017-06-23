import React from 'react';

export default class BodyChild extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
  }
  render() {
    return (
      <div>
        BodyIndex传递的方法
        <p>子页面输入: <input type="text" onChange={this.props.handleChildValChanged}/></p>
      </div>
    )
  }
}
