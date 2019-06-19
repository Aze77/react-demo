/*
  验证是否有访问权限：如果有权限才可以正常进入相关页面
  如果没有权限，重新跳转到登录页面
*/

import React from 'react';
import { Route, Redirect } from "react-router-dom";

class AuthCheck extends React.Component {
  // renderInfo() {
  //   return (
  //     <div>
  //       <div>你好</div>
  //       <div>Hello</div>
  //     </div>
  //   );
  // }
  render() {
    let { path, component: Component } = this.props;
    // 验证用户是否已经登录
    let isLogin = sessionStorage.getItem('mytoken')?true: false;
    return (
      <Route path={path} render={() => {
        // 登录验证
        if(isLogin) {
          // 已经登录，正常跳转到对应组件
          return <Component/>
        } else {
          // 没有登录，重新跳转到登录页
          return <Redirect to='/login'/>
        }
      }}/>
    );
  }
}

export default AuthCheck;
