var React = require('react');
var ReactDOM = require('react-dom');

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyindex.js';

// 声明Index组件
class Index extends React.Component {
  componentWillMount() {
    // 定义逻辑代码
    console.log('Index -- componentWillMount');
  }
  componentDidMount() {
    console.log('Index -- componentDidMount');
  }
  // return返回的节点只能有一个根节点
  render() {
    const myHeader = <ComponentHeader/>;
    return (
      <div>
        {myHeader}
        <BodyIndex/>
        <ComponentFooter/>
      </div>
    )
  }
}

// 组件绑定 相当于程序的入口
ReactDOM.render(
  <Index/>, document.getElementById('example'));
