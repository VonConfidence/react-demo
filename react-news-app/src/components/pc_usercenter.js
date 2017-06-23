import React from 'react'

import PCHeader from './pc_header.js'
import PCFooter from './pc_footer.js'

import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal,
  Upload,
  Card
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      usercollection:'',
      usercomment:'',
      previewVisible: false,  //预览框显示
      previewImage: '',  //表示预览的图片
      fileList: [{ //起始位置的时候的默认图片
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1785388974,2249853498&fm=117&gp=0.jpg'
      }],
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    //userid 从localstorage获取
    var url = 'http://localhost:3000/news/getCollection?userid=1';
    console.log(url)
    fetch(url, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({usercollection: json.data})
    })

    var urlGetComment = 'http://localhost:3000/news/getComment?userid=1';
    fetch(urlGetComment, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({usercomment: json.data})
    })
  }
  handleCancel() {
    this.setState({ previewVisible: false })
  }

  handlePreview(file) {
    //点击文件链接或预览图标时的回调
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      action : "http://localhost:3000/news/user_img_upload",
      listType : "picture-card",
      fileList : this.state.fileList,
      onPreview : this.handlePreview.bind(this),
      onChange : this.handleChange.bind(this)
    }
    const {usercollection} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((ucItem,index)=> (
      <Card key={index} title={ucItem.datetime} extra={<a target="_blank" href={`/#/details/${ucItem.uniquekey}?title=${ucItem.title}`}>查看</a>} >
        <p>{ucItem.title}</p>
      </Card>
    ))
    :
    '你还没有收藏任何文章'

    const {usercomment} = this.state;
    const usercommentList = usercomment.length ?
    usercomment.map((comment,index)=> (
      <Card loading  key={index} title={`于 ${comment.datetime} 评论了文章  ${comment.title}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}?title=${comment.title}`}>查看</a>} >
        <p>{comment.comments}</p>
      </Card>
    ))
    :
    '你还没有发表过任何评论'
    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="收藏列表" key="1">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="评论列表" key="2">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercommentList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="个人资料" key="3">
                <div class="clearfix">
                  <Upload {...props}>
                    {fileList.length >= 1? null: uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{
                      width: '100%'
                    }} src={previewImage}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>

        <PCFooter></PCFooter>
      </div>
    )
  }
}
