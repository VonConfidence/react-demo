import React from 'react';
import PropTypes from 'prop-types';

import BodyChild from './bodychild.js'

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
  }
  handleChildValChanged(event) {
    this.setState({age: event.target.value})
  }
  render() {
    /*
    setTimeout(() => {
      this.setState({username: 'Imooc', age: 30})
    },2000) */
    console.log('render');
    return (
      <div>
        <h2>页面的主题内容
        </h2>
        <p>state username: {this.state.username}  age: {this.state.age}</p>

        <h2>props: userid:  {this.props.userid}   username: {this.props.username}</h2>
        <input type="button" value="提交" onClick={this.changeUserInfo.bind(this, 90)} />
        <hr/>
        <BodyChild {...this.props} handleChildValChanged={this.handleChildValChanged.bind(this)}/>
      </div>
    )
  }
}

BodyIndex.propTypes = {
  userid: PropTypes.number.isRequired
  /*number func bool string*/
}

BodyIndex.defaultProps = defaultProps;
