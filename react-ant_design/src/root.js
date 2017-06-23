import React from 'react'
import ReactDOM from 'react-dom'
import Index from './index'
import {Router, Route, hashHistory} from 'react-router'

import ComponentList from './components/list.js'
import ComponentDetails from './components/details.js'

export default class Root extends React.Component {
  render() {
    return (
      //这里替换了之前的Index, 变成了程序的入口
      <Router history={hashHistory}>
        <Route component={Index} path="/">
          <Route component={ComponentDetails} path="details"></Route>
        </Route>
        <Route component={ComponentList} path="/list/:id"></Route>
      </Router>
    )
  }
}

// 组件绑定 相当于程序的入口
ReactDOM.render(
  <Root/>, document.getElementById('example'));
