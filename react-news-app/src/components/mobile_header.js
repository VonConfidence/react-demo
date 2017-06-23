import React from 'react'

import {Row, Col} from 'antd';
import {Link} from 'react-router'
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor() {
    super(); // 调用基类所有的初始化方法
    this.state = {
      current: 'top', //绑定当前选中的新闻类型
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    }
  }
  setModalVisible(value) {
    this.setState({modalVisible: value});
  }
  handleClick(e) {
    console.log('click ', e);
    if (e.key == 'register') {
      this.setModalVisible(true);
    }
    this.setState({current: e.key});
  }
  handleSubmit(e) {
    //页面提交
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    }
    var formData = this.props.form.getFieldsValue(); //获取所有的参数值
    console.log(formData);
    //var url = `http://newsapi.guguijiankong.com/Handler.aspx?action=register&username=${formData.r_username}&password=${formData.r_password}&confirmPassword=${formData.r_confirmpassword}`
    var url = `http://localhost:3000/news/regist?username=${formData.r_username}&password=${formData.r_password}&confirmPassword=${formData.r_confirmpassword}`
    console.log(url)
    fetch(url).then(response => response.json()).then(json => {
      //console.log(json);
      /*
        Object {userid: 4, NickUsername: "fengzixin"}
       */
      this.setState({userNickName: json.NickUsername, userid: json.UserId});
    })
    message.success("请求成功!!!");
    this.setModalVisible(false);
  }
  loginOrRegist() {
    this.setModalVisible(true);
  }
  handleLogin(e) {
    //页面提交
    e.preventDefault();
    var formData = this.props.form.getFieldsValue(); //获取所有的参数值

    var bodyData = {
      json: JSON.stringify({username: formData.r_username, password: formData.r_password}),
      delay: 3
    }
    var myFetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'json=' + encodeURIComponent(JSON.stringify(bodyData.json)) + '&delay=' + bodyData.delay
    }

    //var url = `http://newsapi.guguijiankong.com/Handler.aspx?action=register&username=${formData.r_username}&password=${formData.r_password}&confirmPassword=${formData.r_confirmpassword}`
    var url = `http://localhost:3000/news/login`
    console.log(url)
    fetch(url,myFetchOptions).then(response => response.json()).then(json => {
      console.log(json)
      this.setState({userNickname: json.data.userNickname, userid: json.data.userid,hasLogined: true});
    })
    message.success("登录成功!!!");
    this.setModalVisible(false);
  }
  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ? <Link to={`/usercenter`}>
          <Icon type="inbox"/>
        </Link>
      : <Icon type="setting" onClick={this.loginOrRegist.bind(this)}/>
    return (
      <div id="mobileHeader">
        <header>
          <img src="./src/images/logo.png" alt="新闻首页"/>
          <span>ReactNews
          </span>
          {userShow}
        </header>
        <Modal title="用户中心" wrapClassName="vertical-center-align" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="确定" cancelText="取消">
          <Tabs type="card">
            <TabPane tab="注册" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入你的用户名',
                        whitespace: true
                      }
                    ]
                  })(<Input/>)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码'
                      }
                    ]
                  })(<Input type="password"/>)}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmpassword', {
                    rules: [
                      {
                        required: true,
                        message: '确认密码'
                      }
                    ]
                  })(<Input type="password"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
            <TabPane tab="登录" key="2">
              <Form layout="horizontal" onSubmit={this.handleLogin.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入你的用户名',
                        whitespace: true
                      }
                    ]
                  })(<Input/>)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码'
                      }
                    ]
                  })(<Input type="password"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="关于" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)
