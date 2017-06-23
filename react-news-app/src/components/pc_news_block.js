import React from 'react'
import {Card} from 'antd'

import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    }
  }
  componentWillMount() { //生命周期函数
    var myFetchOptions = {
      method: 'GET',
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
        <li key={index}>
          <Link to={{pathname:`details/${newsItem.uniquekey}`, query: {title: newsItem.title }}} target="_blank" title={newsItem.title}>{newsItem.title}</Link>
        </li>
      ))
      : "没有加载到任何新闻";
    return (
      <div class="topNewsList">
        <Card>
          <ul>{newList}</ul>
        </Card>
      </div>
    )
  }
}
