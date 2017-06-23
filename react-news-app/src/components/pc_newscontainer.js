import React from 'react'
import {Row, Col} from 'antd'
import {Tabs, Carousel} from 'antd'

const TabPane = Tabs.TabPane;

import PCNewsBlock from './pc_news_block.js'
import PCImageBlock from './pc_image_block.js'

export default class PCNewsContainer extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div className="leftContainer">
              <div class="carousel">
                <Carousel autoplay effect="fade">
                  <div><img src="http://desk.fd.zol-img.com.cn/t_s1920x1080c5/g2/M00/0E/00/Cg-4WVWtq6CIBnf4AEeW6YIxmuwAAHbpQFDQ1EAR5cB158.jpg" alt=""/></div>
                  <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cOCIWYovAGUOWJZEBqEAAHxugFNlMMAZQ5w169.jpg" alt=""/></div>
                  <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cPSIfC8kACJLpZQQtUYAAHxuwCTVPYAIku9417.jpg" alt=""/></div>
                  <div><img src="http://desk.fd.zol-img.com.cn/t_s1680x1050c5/g2/M00/0D/0E/ChMlWVW4cRGIAFVfABb2LJEup-EAAHxvACm_fMAFvZE103.jpg" alt=""/></div>
                </Carousel>
                <PCImageBlock count={6} type="guoji" cartTitle="国际头条" imageWidth="112px" width="400px"></PCImageBlock>
              </div>
            </div>
            <Tabs class="tabs_news" defaultActiveKey="1">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock type="top" count={21} bordered="false" width="100%"/>
              </TabPane>
              <TabPane tab="娱乐" key="2">
                <PCNewsBlock type="娱乐" count={21} bordered="false" width="100%"/>
              </TabPane>
            </Tabs>
            <div>
              <PCImageBlock type="yule" count={16} width="100%" cartTitle="娱乐" imageWidth="132px"/>
              <PCImageBlock count={8} type="guoji" width="100%" cartTitle="国际新闻" imageWidth="132px"/>
              <PCImageBlock count={16} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
