import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export default class ComponentHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header>
        <h1>这里是头部</h1>
        <ul>
          <li><Link to="/list/1234">List 列表页</Link></li>
          <li><Link to="/details">Details 详情页</Link></li>
          <li><Link to="/">首页</Link></li>
        </ul>
      </header>
    )
  }
}
