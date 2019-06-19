/*
  微聊
*/
import React from 'react';
import './Chat.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import cfg from '../../common.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    // 调用接口，后期聊天列表数据
    axios.post('chats/list').then(res=>{
      // 更新状态
      this.setState({
        list: res.data.list
      });
    });
  }
  toChatWindow = (fuser,tuser,uname) => {
    // 跳转到聊天窗口
    let { history } = this.props;
    history.push('/home/chatwin', {
      fromUser: fuser,
      toUser: tuser,
      uname: uname
    });
  }
  render() {
    let chatList = this.state.list.map(item=>{
      return (
        <li onClick={this.toChatWindow.bind(this, item.from_user, item.to_user, item.username)} key={item.id}>
          <div className="avarter">
            <img src={cfg.baseURL + item.avatar} alt="avarter"/>
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      );
    });
    return (
      <div className='chat-container'>
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>
            {chatList}
          </ul>
        </div>
      </div>
    );
  }
}
export default withRouter(Chat);