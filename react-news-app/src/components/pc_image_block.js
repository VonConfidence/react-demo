import React from 'react'
import {Card} from 'antd'

import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCImageBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    }
  }
  componentWillMount() { //生命周期函数
    var myFetchOptions = {
      method: 'GET',
      mode: 'no-cors'
    };
    var type = this.props.type;
    var count = this.props.count;

    //var url = `http://v.juhe.cn/toutiao/index?type=${type}count=${count}&key=68a5edf415c81245d80ebc4c1450a44c`;
    var url = `http://localhost:3000/news/news?type=${type}&count=${count}`;
    fetch(url).then(response => response.json()).then(json => this.setState({news: json.data}))
    //fetch(url).then(response => response.json()).then(json=> console.log(json))
  }
  render() {
    //样式定义
    const styleImage = {
      display:"block",
      width: this.props.imageWidth,
      height: '90px'
    };
    const styH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };

    const {news} = this.state;
    const newList = news.length
      ? news.map((newsItem, index) => (
        <div key={index} class="imageblock">
          <Link to={{pathname:`details/${newsItem.uniquekey}`, query: {title: newsItem.title }}} target="_blank">
            <div class="custom-image">
              <img src={newsItem.thumbnail_pic_s} alt="" style={styleImage}/>
            </div>
            <div class="custom-card">
              <h3 style={styH3} title={newsItem.title}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
            </div>
          </Link>
        </div>
      ))
      : "没有加载到任何新闻";
    return (
      <div class="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
          {newList}
        </Card>
      </div>
    )
  }
}
