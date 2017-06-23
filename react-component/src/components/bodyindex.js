import React from 'react';

export default class BodyIndex extends React.Component {
  componentWillMount() {
    // 定义逻辑代码
    console.log('BodyIndex -- componentWillMount');
  }
  componentDidMount() {
    console.log('BodyIndex -- componentDidMount');
  }
  /*
  Index -- componentWillMount
  BodyIndex -- componentWillMount
  BodyIndex -- componentDidMount
  Index -- componentDidMount
   */
  render() {
    var username = 'confidence';
    var boolInput = false;
    var html = "Von&nbsp;Confidence"; // "\u0020"
    return (
      <div>
        <h2>页面的主题内容 </h2>
        {/*
          如果是state里面的数据 调用的方法是: {this.state.username}
          */}
        <p>{username=='' ? '用户没有登录': '用户名:' + username}</p>
        <p><input type="button" value="默认按钮" disabled={boolInput} /></p>
              {/*JSX的注释方法 不能随便的添加注解*/}
        <p dangerouslySetInnerHTML = {{__html: html}}></p> {/*需要转码*/}
      </div>
    )
  }
}
