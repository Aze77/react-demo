/*
  登录组件
*/
import React from 'react';
import { Icon, Form, Button, Divider } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './Login.css';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit = () => {
    let {history} = this.props;
    // 控制表单提交
    axios.post('users/login', {
      uname: this.state.username,
      pwd: this.state.password
    }).then(res=>{
      if(res.meta.status === 200) {
        // 登录成功，跳转到Home组件
        // 保存token信息到本地存储
        sessionStorage.setItem('mytoken', res.data.token);
        sessionStorage.setItem('uid', res.data.uid);
        // 编程式导航
        history.push('/home');
      }
    })
  }
  render() {
    return (
      <div className='login-container'>
        {/*顶部图标*/}
        <div className="login-logo">
          <Icon name='home' size='huge'/>
        </div>
        {/*登录表单*/}
        <Form className='login-form'>
          <Form.Input 
            icon='user' 
            required 
            size='big' 
            iconPosition='left' 
            name='username'
            value={this.state.username}
            onChange={this.handleUsername}
            placeholder='请输入用户名...' 
           />
           <Form.Input 
            icon='key' 
            required 
            size='big' 
            type='password'
            iconPosition='left' 
            name='password'
            value={this.state.password}
            onChange={this.handlePassword}
            placeholder='请输入密码...' 
           />
           <Button onClick={this.handleSubmit} fluid color='green'>登录</Button>
        </Form>
        <Divider horizontal>---</Divider>
        <div className="login-third">
          <Icon name='rocketchat' size='big' />
          <Icon name='qq' size='big' />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
