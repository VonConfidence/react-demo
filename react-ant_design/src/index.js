var React = require('react');
var ReactDOM = require('react-dom');

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyindex.js';

export default React.createClass( {
  render() {
    const myHeader = <ComponentHeader/>;
    return (
      <div>
        {myHeader}
        <BodyIndex userid={123456} username={"huazhong"}/>
        <div> {/*展示详情页*/}
          {this.props.children}
        </div>
        <hr/>
        <ComponentFooter/>


      </div>
    )
  }
});
