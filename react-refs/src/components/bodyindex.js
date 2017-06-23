import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import BodyChild from './bodychild.js'

import MinxinLog from './mixins'
import ReactMixin from 'react-mixin'

const defaultProps = {
  username: '这是一个默认的用户性'
};

export default class BodyIndex extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
    this.state = {
      username: 'Confidence'
    }
  }
  changeUserInfo(age) {
    this.setState({age});
    // 第一种方式 原生操作  (不推荐的操作)
    var mySubmitButton = document.getElementById('submitButton');
    ReactDOM.findDOMNode(mySubmitButton).style.color = 'red';

    //第二种方式 定义refs
    //console.log(this.refs.submitButton);

    MinxinLog.log();

  }
  handleChildValChanged(event) {
    this.setState({age: event.target.value})
  }
  render() {

    return (
      <div>
        <h2>页面的主题内容</h2>

        <p>state username: {this.state.username}  age: {this.state.age}</p>
        
        <h2>props: userid:  {this.props.userid}   username: {this.props.username}</h2>
        <input type="button" id="submitButton"  ref="submitButton" value="提交" onClick={this.changeUserInfo.bind(this, 90)} />

        <hr/>
        BodyChild界面传递数据
        <BodyChild handleChildValChanged={this.handleChildValChanged.bind(this)}/>
      </div>
    )
  }
}

BodyIndex.propTypes = {
  userid: PropTypes.number.isRequired
  /*number func bool string*/
}

BodyIndex.defaultProps = defaultProps;

ReactMixin(BodyIndex.prototype, MinxinLog);
