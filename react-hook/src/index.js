var React = require('react');
var ReactDOM = require('react-dom');

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyindex.js';

class Index extends React.Component {
  render() {
    const myHeader = <ComponentHeader/>;
    return (
      <div>
        {myHeader}
        <BodyIndex userid={123456} username={"huazhong"}/>
        <ComponentFooter/>
      </div>
    )
  }
}

// 组件绑定 相当于程序的入口
ReactDOM.render(
  <Index/>, document.getElementById('example'));
