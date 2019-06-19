/*
  主页整体布局
*/
import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Route, Link, Redirect, Switch } from "react-router-dom";
import './Main.css';
import Home from './home/Home.js';
import Info from './info/Info.js';
import Chat from './chat/Chat.js';
import ChatWin from './chat/ChatWindow.js';
import My from './my/My.js';
import HomeList from './home/HomeList.js';
import HomeCalc from './home/HomeCalc.js';
import HomeMap from './home/HomeMap.js';

// 菜单组件封装
class Menu extends React.Component {
  render() {
    let {name, icon, path} = this.props;
    return (
      <Grid.Column>
        {/*无论路径是否匹配，都会触发children对应的函数*/}
        <Route path={path} children={(props)=>{
          let {match} = props;
          // 这里可以更加match的值区分点击的是否为当前链接
          // 如果是当前链接，那么match的值非空的，否则为null
          let active = match? 'active': '';
          return (
            <Link to={path}>
              <div className={'menu ' + active}>
                <Icon name={icon}/>
                <div>{name}</div>
              </div>
            </Link>
          );
        }}/>
      </Grid.Column>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className="main-content">
          {/*路由组件填充位置和路由映射*/}
          {/*通过重定向方式，直接默认显示第一个菜单*/}
          <Switch>
            {/*Redirect在Switch中，Redirect路径如果和Route组件的path存在包含关系，就会有问题，保证两者不包含*/}
            <Redirect exact from='/home' to='/home/main'/>
            <Route path='/home/main' component={Home}/>
            <Route path='/home/info' component={Info}/>
            <Route path='/home/chat' component={Chat}/>
            <Route path='/home/chatwin' component={ChatWin}/>
            <Route path='/home/my' component={My}/>
            <Route path='/home/list' component={HomeList}/>
            <Route path='/home/calc' component={HomeCalc}/>
            <Route path='/home/map' component={HomeMap}/>
          </Switch>
        </div>
        <div className="main-menu">
          <Grid columns={4} divided>
            <Grid.Row>
              <Menu name='主页' path='/home/main' icon='home'/>
              <Menu name='资讯' path='/home/info' icon='search'/>
              <Menu name='微聊' path='/home/chat' icon='rocketchat'/>
              <Menu name='我的' path='/home/my' icon='setting'/>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;