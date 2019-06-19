import React from 'react';
import './App.css';
// 导入UI组件库的样式
import 'semantic-ui-css/semantic.min.css';
// import { Button } from 'semantic-ui-react';
import Login from './Login.js';
// 导入路由相关组件
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// 导入axios
import axios from 'axios';
import AuthCheck from './AuthCheck.js';
import Main from './module/Main.js';
import cfg from './common.js';

// 配置请求的基准路径
axios.defaults.baseURL = cfg.baseURL;
// 配置请求拦截器，统一添加token请求头
axios.interceptors.request.use(function (config) {
  // 如果请求的路径不是登录接口，就添加请求头
  if(!config.url.endsWith('users/login')){
    // 给请求地址统一添加token
    config.headers.Authorization = sessionStorage.getItem('mytoken');
  }
  return config;
})
// 配置响应拦截器，对服务器响应的结果进行处理
axios.interceptors.response.use(function(res){
  // 去掉axios默认添加的data属性
  return res.data;
});

function Test() {
  return <div>Test</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={ Login }/>
        <Route path='/home' component={ Main }/>
        <AuthCheck path='/test' component={ Test }/>
        <Redirect from='/' to='/login'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
