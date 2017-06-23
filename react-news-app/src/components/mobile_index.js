import React from 'react'

import MobileHeader from './mobile_header.js'
import MobileFooter from './mobile_footer.js'
import MobileList from './mobile_list.js'

import {Icon, Tabs, Carousel} from 'antd';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
  clickTab(key) {
    console.log(key);
  }
  render() {
    return (
      <div>
        <MobileHeader/>
        <Tabs defaultActiveKey="1" onChange={this.clickTab}>
          <TabPane tab="头条" key="1">
            <div className="carousel">
              <Carousel autoplay effect="fade">
                <div><img src="http://desk.fd.zol-img.com.cn/t_s1920x1080c5/g2/M00/0E/00/Cg-4WVWtq6CIBnf4AEeW6YIxmuwAAHbpQFDQ1EAR5cB158.jpg" alt=""/></div>
                <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cOCIWYovAGUOWJZEBqEAAHxugFNlMMAZQ5w169.jpg" alt=""/></div>
                <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cPSIfC8kACJLpZQQtUYAAHxuwCTVPYAIku9417.jpg" alt=""/></div>
                <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cRGIAFVfABb2LJEup-EAAHxvACm_fMAFvZE103.jpg" alt=""/></div>
              </Carousel>
            </div>
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type="yule"/>
          </TabPane>
          <TabPane tab="体育" key="6">
            <MobileList count={20} type="tiyu"/>
          </TabPane>
          <TabPane tab="军事" key="7">
            <MobileList count={20} type="junshi"/>
          </TabPane>
          <TabPane tab="科技" key="8">
            <MobileList count={20} type="keji"/>
          </TabPane>
          <TabPane tab="财经" key="9">
            <MobileList count={20} type="caijing"/>
          </TabPane>
          <TabPane tab="时尚" key="10">
            <MobileList count={20} type="shishang"/>
          </TabPane>
        </Tabs>
        <MobileFooter/>
      </div>
    )
  }
}
