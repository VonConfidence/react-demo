import React from 'react'
import {Row, Col} from 'antd'

import {Router, Route, Link, browserHistory} from 'react-router'

export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    }
  }
  componentWillMount() { //生命周期函数
    var myFetchOptions = {
      method: 'GET'
    };
    var type = this.props.type;
    var count = this.props.count;

    //var url = `http://v.juhe.cn/toutiao/index?type=${type}count=${count}&key=68a5edf415c81245d80ebc4c1450a44c`;
    var url = `http://localhost:3000/news/news?type=${type}&count=${count}`;
    fetch(url, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json.data}))
    //fetch(url).then(response => response.json()).then(json=> console.log(json))
  }
  render() {
    const {news} = this.state;
    const newList = news.length
      ? news.map((newsItem, index) => (
        <section key={index} className="m_article list-item  special_section clearfix">
          <Link to={{pathname:`details/${newsItem.uniquekey}`, query: {title: newsItem.title }}} >
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.category}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))
      : "没有加载到任何新闻";
    return (
      <div>
        <Row>
          <Col span={24}>
            {newList}
          </Col>
        </Row>
      </div>
    )
  }
}
