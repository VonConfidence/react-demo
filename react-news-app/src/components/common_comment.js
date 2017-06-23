import React from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'

import {Row, Col} from 'antd';
import {
  Tabs,
  message,
  Form,
  Input,
  Button,
  Card,
  notification
} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments:''
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    var url = 'http://localhost:3000/news/getComments?uniquekey='+this.props.uniquekey;
    console.log(url)
    fetch(url, myFetchOptions).then(response => response.json()).then(json => {
      console.log(json.data)
      this.setState({comments: json.data})
    })
  }
  handleSubmit(e) {
    // 评论的提交
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    }
    var formData = this.props.form.getFieldsValue(); //获取所有的参数值
    console.log(formData);
    //var url = `http://newsapi.guguijiankong.com/Handler.aspx?action=register&username=${formData.r_username}&password=${formData.r_password}&confirmPassword=${formData.r_confirmpassword}`
    var url = `http://localhost:3000/news/addComment?userid=1&uniquekey=9d71a5bb6ebec93fa0cd74dfcfb046f7&comments=${formData.remark}`
    //var url = `http://localhost:3000/news/addComment?userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}&comment=${formData.remark}`
    console.log(url)
    fetch(url).then(response => response.json()).then(json => {
      // 重新加载评论区
      if (!json) {
        message.success("评论失败!!!");
        return ;
      }
      this.componentDidMount();
    })
    message.success("请求成功!!!");
  }
  addUserCollection() {
    var myFetchOptions = {
      method: 'get'
    }
    //var url = `http://localhost:3000/addUserCollection?userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}`
    var url = `http://localhost:3000/news/addUserCollection?userid=1&uniquekey=${this.props.uniquekey}`
    fetch(url, myFetchOptions).then(response=>response.json()).then(json=> {
      console.log(json)
      //收藏成功以后 进行全局的提醒
      if (json.data.insertId) {
        notification["success"]({
          message: 'ReactNews 提醒',
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
          description: '收藏成功',
        });
      }else{
        notification["error"]({
          message: 'ReactNews 提醒',
          icon: <Icon type="frown" style={{ color: 'gray' }} />,
          description: '你已经收藏过了该文章',
        });
      }
    })
  }
  render() {
    let {getFieldDecorator} = this.props.form;

    const {comments} = this.state;
    const commentList = comments.length ?
    comments.map((commentItem, index)=>(
      <Card key={index} title={'用户: '+commentItem.uname} extra={<a href="#">发布于 {commentItem.datetime}</a>}>
        <p>{commentItem.comments}</p>
        <input type="hidden" value={commentItem.id}/>
      </Card>
    ))
    :
    "还没有任何评论 赶紧抢沙发啊!!!"
    return (
      <div class="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="你的评论">
                {getFieldDecorator('remark', {
                  rules: [
                    {
                      required: true,
                      message: '评论内容',
                      whitespace: true
                    }
                  ]
                })(<Input type="textarea"/>)}
              </FormItem>
              <Button type="primary" htmlType="submit">发表评论</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments)
