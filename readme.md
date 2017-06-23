## 安装命令

    jspm install react@0.14.0-rcl  
    jspm install react-dom@0.14.0-rcl  
    jspm install semantic-ui  
    jspm install css
    browser-sync start --server --no-notify --files 'index.html, app/**/*.js'


## react
  1. React虚拟DOM概念
  2. React 组件
  3. React 多组件嵌套
  4. JSX内置表达式
  5. React生命周期

  React属性与事件
    + State属性 Props属性 事件与数据的双向绑定(父子页面数据传递)
    + 可复用组件, 快速高效
    + 组件的refs
    + 独立组件之间共享Mixins

  React样式
    + 内联样式
    + 内联样式中的表达式
    + Css模块化, 学习require的使用
    + JSX样式与css的转换
    + 好用的框架Ant Design样式

  React Router
    + router概念
    + router参数的传递

## Hello React
  1. react常用包  
      + npm install --save react react-dom babel-preset-react babel-loader babel-core  
      + webpack main.js bundle.js --module-bind 'js=babel-loader'
      + npm install --save babel-preset-es2015
  2. webpack的热加载机制  
      npm install webpack -g  全局安装之后局部安装  
      npm install webpack-dev-server -g  
      webpack --watch  
      webpack-dev-server --contentbase src --inline --hot

## 开发工具和必要组件
  1. 开发工具包  
      atom-ternjs  
      atom-beautify  
      highlight-line  
      highlight-selected  


## React 组件基础
  1. 虚拟DOM的结构
  2. React组件
  3. React多组件嵌套
  4. JSX内置表达式
    + js注释
    + jsx的注释  
        {/*JSX的注释方法 不能随便的添加注解*/}
    + html绑定  
      ```html
      <p><input type="button" value="默认按钮" disabled={boolInput} /></p>
      <p dangerouslySetInnerHTML = {{__html: html}}></p> {/*需要转码*/}
      ```
  5. 生命周期
    + component instantiated
      - getDefaultProps()
      - getInitialState()
      - render() -> componentWillUpdate() -> componentDidUpdate()
      - componentWillMount()
      - componentDidMount()
    + props changed
      - componentWillReceivePorps()
      - shouldComponentUpdate()
    + setState()
      - shouldComponentUpdate()
    + component deleted
      - componentWillUnmount()

    + 流程图
      1. getDefaultProps
      2. getInitialState
      3. componentWillMount
      4. render
      5. componentDidMount
        + componentWillReceivePorps->shouldComponentUpdate->componentWillUpdate
        + componentWillUnmount -> END
      6. componentWillUpdate
      7. render
      8. componentDidUpdate

  6. 可复用组件
    + state属性  
      - 只在当前作用域起作用, 不污染其他作用域  
      - 初始化放在构造函数constructor函数中  this.state={username:'f'}
      - 修改state" this.setState({username:'IMOOC'})
    + props属性  
      - props对于模块来说是外来属性
      - 传递参数 <BoydIndex username="feng"/>
      - 模块中接收参数: this.props.username

    + 事件与数据的双向绑定
      - 利用props传递数据和绑定事件
      - onClick={this.props.handleChildValChanged}
      -
        ```html
        <BodyChild handleChildValChanged={this.handleChildValChanged.bind(this)}/>
        ```
      - 一次性传递所有的属性到子组件当中
        ```html
        <BodyChild {...this.props} />
        ```
  7. 组件的Refs
      - 定义ref  
        ```html
          <input ref="myInput" />
        ```
      - 组件获取 this.refs.myInput
      - 样式操作 this.refs.myInput.style.color='red'
      - Ref是访问到组件内部DOM节点的唯一可靠的方法
      - Refs会自动销毁对子对象的引用
      - 不要再render或者 render之前对Refs进行调用
  8. 组件独立间共享Mixins
      - 不同组件之间公用功能, 共享代码
      - npm install react-mixin@2
      - 和页面具有一样的生命周期

## React 样式
  1. 内联样式
    - 缺点: 动画伪类无法使用 内联式
  2. 内联样式中的表达式
    - paddingTop: (this.state.minHeader) ? '3px' : '15px'
  3. CSS模块化
    - babel-plugin-react-html-attrs  (className和class都可以)
    - style-loader
    - css-loader
    - webpack配置
    ```json
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]']
      }
    ```
    ```html
      <footer class={footerCss.minFooter}>
        <h1>这里是页脚, 一般放置版权信息. </h1>
      </footer>
    ```
    - 全局污染 命名混乱 依赖管理不彻底 无法共享变量 代码压缩不彻底
    - 模块化优点:
      + 解决命名冲突和全局污染
      + class名生成规则配置灵活 可以用来压缩class名
      + 只需要引用组件的js就能搞定所有的JS和css
      + 依然是css 几乎零学习成本
  4. JSX样式与CSS的互转
    - css to react 将css转化为react对象 使用内联方式
  5. Ant Design 样式框架介绍与使用
    - [Ant Design](https://ant.design/docs/spec/introduce-cn)
    + [docs](https://ant.design/docs/react/getting-started-cn)
    - npm install antd --save | yarn add antd

## React Router
  1. Router概念
    + npm install react-router@2 --save (2.8.1)
    + 控制页面的层级关系
    + 单页面构建Router应用
    + 底层机制

  2. 参数传递
    + path="/list/:id"  {this.props.params.id}

## 实战之开发环境初始化
  + 项目初始化
  + Ant Design框架的引入
  + 头条新闻数据接口简介
  + 数据用户API接口
  + 测试环境介绍

## 页头页脚模块
  + PC端
  + 移动端
    - npm install react-responsive --save
    - [react-responsive](https://github.com/contra/react-responsive)

  + 登录模块
    - fetch框架  对请求过来的json进行二次操作 (在所有的js项目中均可使用)
    - npm install fetch --save (1.1.0)
    - 网络请求使用的组件使用的是fetch
      ```js
      fetch(url).then(response=> response.json()).then(json=> {
        //console.log(json);
        /*
          Object {userid: 4, NickUsername: "fengzixin"}
         */
        this.setState({userNickName:json.NickUsername, userid: json.UserId});
      })

      fetch(url,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: 'json=' + encodeURIComponent(JSON.stringify(jsonObject))
      }).then(function(res){ console.log(res) }).catch(function(res){ console.log(res) })
      ```
