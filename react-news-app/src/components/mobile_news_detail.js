import React from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'

import {Row, Col, BackTop} from 'antd'

import MobileHeader from './mobile_header.js'
import MobileFooter from './mobile_footer.js'
import CommonComments from './common_comment.js'

export default class MobileNewsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ''
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    var url = 'http://localhost:3000/news/news_detail?uniquekey='+this.props.params.uniquekey;
    console.log(url)
    fetch(url, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({newsItem: json.data})
      document.title = this.props.location.query.title + " - React News | React 驱动新闻平台" ;
    })
  }
  createMarkup() {
    return {__html: this.state.newsItem}
  }
  render() {
    return (
      <div id="mobileDetailContainer">
        <MobileHeader></MobileHeader>
        <div className="ucmobileList">
          <Row>
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <hr/>
              <CommonComments uniquekey={this.props.params.uniquekey} />
            </Col>
          </Row>
          <MobileFooter></MobileFooter>
          <BackTop />
        </div>
      </div>
    )
  }
}
