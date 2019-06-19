/*
  聊天窗口
*/
import React from 'react';
import { Form, Icon, TextArea, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './ChatWindow.css';
import cfg from '../../common.js';
// 导入封装好WebSocket模块
import handleWebSocket, {IMEvent} from './wsclient.js';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromUser: '',
      toUser: '',
      uname: '',
      list: [],
      msg: '',
      wsclient: null
    }
  }

  // 给对方发送消息
  sendMsg = () => {
    let {fromUser, toUser, msg, wsclient} = this.state;
    // 1、封装消息数据包,用于发送给对方
    let pdata = {
      id: Math.random() + '',
      from_user: fromUser,
      to_user: toUser,
      avatar: 'public/icon.png',
      chat_msg: msg
    }
    // 2、执行发送的动作
    wsclient.emitEvent(IMEvent.MSG_TEXT_SEND,JSON.stringify(pdata));
    // 3、更新页面
    let listData = [...this.state.list];
    listData.push(pdata);
    this.setState({
      list: listData,
      msg: ''
    });
  }
  
  // 接收对方返回的消息
  receiveMsg = (data) => {
    // 判断对方是否在线
    if(data.content === '对方不在线') {
      return;
    }
    // 获取对方数据，更新页面
    let listData = [...this.state.list];
    let content = JSON.parse(data.content);
    listData.push(content);
    this.setState({
      list: listData
    });
  }

  componentDidMount() {
    // 获取路由参数
    let param = this.props.location.state;
    // 更新状态数据
    this.setState({
      fromUser: param.fromUser,
      toUser: param.toUser,
      uname: param.uname
    });
    axios.post('chats/info', {
      from_user: param.fromUser,
      to_user: param.toUser
    }).then(res=>{
      if(res.meta.status === 200) {
        // 更新数据
        this.setState({
          list: res.data.list
        });
      }
    });
    // 初始化WebSocket连接,并且获取WS客户端实例对象
    // 获取当前登录用户的id
    let currentUser = sessionStorage.getItem('uid');
    let wsclient = handleWebSocket(currentUser, (data) => {
      // 该回调函数用于处理对方发送的消息,需要显示到页面
      this.receiveMsg(data);
    });
    // 更新wsclient
    this.setState({
      wsclient: wsclient
    });
  }
  handleMsg = (e) => {
    this.setState({
      msg: e.target.value
    });
  }
  handleBack = () => {
    // 控制路由回退
    let { history } = this.props;
    history.goBack();
  }
  handleSend = () => {
    // 发送消息
    this.sendMsg();
  }
  render() {
    let chatList = this.state.list.map(item=>{
      // 区分当前用户是谁？
      let currentUser = sessionStorage.getItem('uid');
      currentUser = parseInt(currentUser);
      let infoClass = currentUser === item.from_user?'chat-info-right':'chat-info-left';
      return (
        <li className={infoClass} key={item.id}>
          <img src={cfg.baseURL + item.avatar} alt=""/>
          <span>{item.chat_msg}</span>
        </li>
      );
    });
    return (
      <div className='chat-window'>
        <div className="chat-window-title">
          <Icon onClick={this.handleBack} name='angle left' className='chat-ret-btn' size='large'/>
          <span>{this.state.uname}</span>
        </div>
        <div className="chat-window-content">
          <ul>
            {chatList}
          </ul>
        </div>
        <div className="chat-window-input">
          <Form>
            <TextArea value={this.state.msg} onChange={this.handleMsg} placeholder='请输入内容...' />
            <Button >关闭</Button>
            <Button onClick={this.handleSend} primary >发送</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatWindow);
