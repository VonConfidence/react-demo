import React from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'

import {Row, Col, BackTop} from 'antd'
import PCHeader from './pc_header.js'
import PCFooter from './pc_footer.js'
import PCNewsBlock from './pc_news_block.js'
import PCImageBlock from './pc_image_block.js'
import CommonComments from './common_comment.js'
export default class PCNewsDetail extends React.Component {
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
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PCImageBlock count={20} type="top" width="100%" cardTitle="相关" imageWidth="132px"></PCImageBlock>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop />
      </div>
    )
  }
}
