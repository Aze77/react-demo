/*
  房源列表
*/
import React from 'react';
import { Icon, Item } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import cfg from '../../common.js';

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: ''
    }
  }
  componentDidMount() {
    // 获取菜单路由参数
    let type = this.props.location.state.type;
    let name = this.props.location.state.name;
    this.setState({
      name: name
    });
    // 根据类型调用后台接口获取房源列表数据
    axios.post('homes/list', {
      home_type: type
    }).then(res=>{
      // 更新数据
      if(res.meta.status === 200) {
        this.setState({
          list: res.data
        });
      }
    })
  }
  handleBack = () => {
    // 控制页面的回退功能
    let {history} = this.props;
    // 回退一个路径（回退到上一个页面）
    history.goBack();
  }
  render() {
    // 动态生成列表模板
    let listInfo = this.state.list.map(item=>{
      return (
        <Item key={item.id}>
          <Item.Image src={cfg.baseURL+'public/home.png'}/>
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {item.home_tags}
            </Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>
      );
    })
    return (
      <div className = 'house-list'>
        <div className = "house-list-title">
          <Icon onClick={this.handleBack} name = 'angle left' size = 'large'/>
          {this.state.name}
        </div> 
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            {listInfo}
          </Item.Group>
        </div>
      </div>
    );
  }
}
export default withRouter(HomeList);