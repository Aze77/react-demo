/*
  主页
*/
import React from 'react';
import { Input, Grid, Icon, Item, Button,Dimmer,Loader } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Home.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import cfg from '../../common.js';

// 菜单布局组件
function MenuLayout(props) {
  let {data, handleClick} = props;
  // 动态生成菜单列表
  let menuList = data.map(menu=>{
    return (
      <Grid.Column key={menu.id} onClick={()=>{handleClick(menu.menu_name)}}>
        <div className='home-menu-item'>
          <Icon name='home' size='big' />
        </div>
        <div>{menu.menu_name}</div>
      </Grid.Column>
    );
  })
  return (
    <div className='home-menu'>
      <Grid columns={4} divided>
        <Grid.Row className='home-menu'>
          {menuList}
        </Grid.Row>
      </Grid>
    </div>
  );
}
// 资讯布局组件
function InfoLayout(props) {
  let {data} = props;
  // 动态生成资讯列表
  let infoList = data.map(info=>{
    return (
      <Item.Header key={info.id}>
        <span>限购 ●</span>
        <span>{info.info_title}</span>
      </Item.Header>
    );
  })
  return (
    <div className="home-msg">
      <Item.Group unstackable>
        <Item className='home-msg-img' >
          <Item.Image size='tiny' src={cfg.baseURL + 'public/zixun.png'} />
          <Item.Content verticalAlign='top'>
            {infoList}
            <div className="home-msg-more">
              <Icon name='angle right' size='big' />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
}
// 问答布局组件
function FaqLayout(props) {
  let {data} = props;
  let faqList = data.map(item=>{
    let tagData = item.question_tag.split(',');
    let tagList = tagData.map((tag,index)=>{
      return <Button key={index} basic color='green' size='mini'>{tag}</Button>
    });
    return (
      <li key={item.question_id}>
        <div>
          <Icon name='question circle outline' />
          <span>{item.question_name}</span>
        </div>
        <div>
          {tagList}
          <div>{item.atime} ● <Icon name='comment alternate outline' />{item.qnum}</div>
        </div>
      </li>
    );
  })
  return (
    <div className='home-ask'>
      <div className='home-ask-title'>好客问答</div>
      <ul>
        {faqList}
      </ul>
    </div>
  );
}
// 房源布局组件
function HouseLayout(props) {
  // 处理房源列表的模板
  let handleHouseList = (data) => {
    return data.map(house=>{
      let tagData = house.home_tags.split(',');
      tagData = tagData.map((tag,index)=>{
        return <Button key={index} basic color='green' size='mini'>{tag}</Button>
      });
      return (
        <Item key={house.id}>
          <Item.Image src={cfg.baseURL+'public/home.png'}/>
          <Item.Content>
            <Item.Header>{house.home_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{house.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {tagData}
            </Item.Description>
            <Item.Description>{house.home_price}</Item.Description>
          </Item.Content>
        </Item>
      );
    });
  }
  let {data} = props;
  let newHouse = [];
  let oldHouse = [];
  let myHome = [];
  // 把房源数据分为三类
  data.forEach(item=>{
    if(item.home_type === 1) {
      // 新房
      newHouse.push(item);
    } else if(item.home_type === 2) {
      // 二手房
      oldHouse.push(item);
    } else {
      // 组一个家
      myHome.push(item);
    }
  });
  // 把房源数据处理为列表模板
  newHouse = handleHouseList(newHouse);
  oldHouse = handleHouseList(oldHouse);
  myHome = handleHouseList(myHome);
  return (
    <div>
      <div>
        <div className='home-hire-title'>最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>组一个家</div>
        <Item.Group divided unstackable>
          {myHome}
        </Item.Group>
      </div>
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFlag: true,
      swiper: [],
      menu: [],
      info: [],
      faq: [],
      house: []
    }
  }
  queryData = (path, attr) => {
    // 封装一个通用的接口调用方法
    return axios.post(path).then(res=>{
      if(res.meta.status === 200) {
        // 更新轮播图数据
        this.setState({
          // ES6新特性：对象的属性名称也可以是动态的
          [attr]: res.data.list
        });
      }
    });
  }

  // handleItem = (e) => {
  //   let key = e.target.getAttribute('name');
  //   this.setState({
  //     [key]: e.target.value
  //   });
  // }

  // handleUname = (e) => {
  //   this.setState({
  //     uname: e.target.value
  //   });
  // }

  // handleAge = (e) => {
  //   this.setState({
  //     age: e.target.value
  //   });
  // }


  componentDidMount() {
    // 初始化数据
    // 轮播图数据
    let swiper = this.queryData('homes/swipe', 'swiper');
    // axios.post('homes/swipe').then(res=>{
    //   if(res.meta.status === 200) {
    //     // 更新轮播图数据
    //     this.setState({
    //       swiper: res.data.list
    //     });
    //   }
    // });
    // 菜单数据
    let menu = this.queryData('homes/menu', 'menu');
    // axios.post('homes/menu').then(res=>{
    //   if(res.meta.status === 200) {
    //     // 更新菜单数据
    //     this.setState({
    //       menu: res.data.list
    //     });
    //   }
    // })
    // 资讯数据
    let info = this.queryData('homes/info', 'info');
    // 问答数据
    let faq = this.queryData('homes/faq', 'faq');
    // 房源数据
    let house = this.queryData('homes/house', 'house');
    // 处理加载的状态位
    Promise.all([swiper, menu, info, faq, house]).then(res=>{
      // 这里表示所有的接口都响应成功了
      this.setState({
        loadFlag: false
      });
    });
  }
  
  // 菜单点击事件函数
  handleClick = (menu) => {
    // 获取历史对象
    let {history} = this.props;
    // 这里应该根据不同的菜单名称，进行相应跳转
    switch(menu){
      case '二手房':
        history.push('/home/list', {type: 1, name: menu});
        break;
      case '新房':
        history.push('/home/list', {type: 2, name: menu});
        break;
      case '租房':
        history.push('/home/list', {type: 3, name: menu});
        break;
      case '海外':
        history.push('/home/list', {type: 4, name: menu});
        break;
      case '计算器':
        history.push('/home/calc');
        break;
      case '地图找房':
        history.push('/home/map');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className='home-container'>
        <div className="home-topbar">
          <Input fluid icon='search' placeholder='请输入搜索内容...' />
        </div>
        <div className="home-content">
          {/*加载遮罩效果*/}
          <Dimmer inverted active={this.state.loadFlag} page>
            <Loader>Loading</Loader>
          </Dimmer>
          {/*轮播图效果*/}
          <ImageGallery 
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            items={this.state.swiper}/>
          {/*菜单布局*/}
          <MenuLayout data={this.state.menu} handleClick={this.handleClick}/>
          {/*资讯布局*/}
          <InfoLayout data={this.state.info}/>
          {/*问答布局*/}
          <FaqLayout data={this.state.faq}/>
          {/*房源布局*/}
          <HouseLayout data={this.state.house}/>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);