import React from 'react'
import ReactDOM from 'react-dom'

import {Router, Route, hashHistory} from 'react-router'

import { Button } from 'antd';
import 'antd/dist/antd.css';


import PCIndex from './components/pc_index.js'
import MobileIndex from './components/mobile_index.js'

import MediaQuery from 'react-responsive'

import PCNewsDetail from './components/pc_news_detail.js'
import MobileNewsDetail from './components/mobile_news_detail.js'

import PCUserCenter from './components/pc_usercenter.js'
import MobileUserCenter from './components/mobile_usercenter.js'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1080px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetail}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
            {/*路由里面传递的参数 跳转到了 component 组件里面进行接收处理 */}
          </Router>
       </MediaQuery>
       <MediaQuery query='(max-device-width: 1080px)'>
         <Router history={hashHistory}>
           <Route path="/" component={MobileIndex}></Route>
           <Route path="/details/:uniquekey" component={MobileNewsDetail}></Route>
           <Route path="/usercenter" component={MobileUserCenter}></Route>
           {/*路由里面传递的参数 跳转到了 component 组件里面进行接收处理 */}
         </Router>
       </MediaQuery>
      </div>
    )
  }
}

// 组件绑定 相当于程序的入口
ReactDOM.render(
  <Index/>, document.getElementById('mainContainer'));
