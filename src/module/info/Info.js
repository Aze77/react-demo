/*
  资讯
*/
import React from 'react';
import { Tab } from 'semantic-ui-react';
import './Info.css';
import LoadMore from './LoadMore.js';

// 资讯组件模板
// class Zixun extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // 列表数据
//       list: [],
//       // 列表的总数
//       total: 0
//     }
//   }
//   componentDidMount() {
//     // 调用后台接口初始化数据
//     axios.post('infos/list', {
//       // pagenum表示当前第几条数据
//       pagenum: 0,
//       // 每页查询多少条
//       pagesize: 2,
//       // 数据的类型：1表示资讯；2表示头条；3表示问答
//       type: 1
//     }).then(res=>{
//       // 更新state中的数据
//       if(res.meta.status === 200) {
//         this.setState({
//           list: res.data.list.data,
//           total: res.data.list.total
//         });
//       }
//     })
//   }
//   render() {
//     let zxList = this.state.list.map(item=>{
//       return (
//         <Item key={item.id}>
//           <Item.Image size='small' src={cfg.baseURL + 'public/1.png'} />
//           <Item.Content verticalAlign='middle'>
//             <Item.Header className='info-title'>{item.info_title}</Item.Header>
//             <Item.Meta>
//               <span className='price'>$1200</span>
//               <span className='stay'>1 Month</span>
//             </Item.Meta>
//           </Item.Content>
//         </Item>
//       );
//     });
//     return (
//       <Item.Group unstackable>
//         {zxList}
//       </Item.Group>
//     );
//   }
// }

class Zixun extends React.Component {
  render() {
    return (
      <LoadMore type={1}/>
    );
  }
}
class Toutiao extends React.Component {
  render() {
    return (
      <LoadMore type={2}/>
    );
  }
}
class Wenda extends React.Component {
  render() {
    return (
      <LoadMore type={3}/>
    );
  }
}

// 头条组件模板
// class Toutiao extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // 列表数据
//       list: [],
//       // 列表的总数
//       total: 0
//     }
//   }
//   componentDidMount() {
//     // 调用后台接口初始化数据
//     axios.post('infos/list', {
//       // pagenum表示当前第几条数据
//       pagenum: 0,
//       // 每页查询多少条
//       pagesize: 2,
//       // 数据的类型：1表示资讯；2表示头条；3表示问答
//       type: 2
//     }).then(res=>{
//       // 更新state中的数据
//       if(res.meta.status === 200) {
//         this.setState({
//           list: res.data.list.data,
//           total: res.data.list.total
//         });
//       }
//     })
//   }
//   render() {
//     let ttList = this.state.list.map(item=>{
//       return (
//         <Item >
//           <Item.Image size='small' src={cfg.baseURL + 'public/1.png'}/>
//           <Item.Content verticalAlign='middle'>
//             <Item.Header className='info-title'>{item.info_title}</Item.Header>
//             <Item.Meta>
//               <span className='price'>$1200</span>
//               <span className='stay'>1 Month</span>
//             </Item.Meta>
//           </Item.Content>
//         </Item>
//       );
//     })
//     return (
//       <Item.Group unstackable>
//         {ttList}
//       </Item.Group>
//     );
//   }
// }

// 问答组件模板
// class Wenda extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // 列表数据
//       list: [],
//       // 列表的总数
//       total: 0
//     }
//   }
//   componentDidMount() {
//     // 调用后台接口初始化数据
//     axios.post('infos/list', {
//       // pagenum表示当前第几条数据
//       pagenum: 0,
//       // 每页查询多少条
//       pagesize: 2,
//       // 数据的类型：1表示资讯；2表示头条；3表示问答
//       type: 3
//     }).then(res=>{
//       // 更新state中的数据
//       if(res.meta.status === 200) {
//         this.setState({
//           list: res.data.list.data,
//           total: res.data.list.total
//         });
//       }
//     })
//   }
//   render() {
//     let wdList = this.state.list.map(item=>{
//       let tags = item.question_tag.split(',').map(tag=>{
//         return (
//           <span>{tag}X</span>
//         );
//       })
//       return (
//         <li>
//           <div className='title'>
//             <span className='cate'>
//               <Icon color='green' name='users' size='small' />
//               思维
//             </span>
//             <span>
//               {item.question_name}
//             </span>
//           </div>
//           <div className='user'>
//             <Icon circular name='users' size='mini'/>
//             {item.username} 的回答
//           </div>
//           <div className="info">
//             {item.answer_content}
//           </div>
//           <div className="tag">
//             {tags}
//             <span>{item.qnum}个回答</span>
//           </div>
//         </li>
//       );
//     })
//     return (
//       <div>
//         <div className='info-ask-btn'>
//           <Button fluid color='green'>快速提问</Button>
//         </div>
//         <ul className='info-ask-list'>
//           {wdList}
//         </ul>
//       </div>
//     );
//   }
// }


class Info extends React.Component {
  render() {
    let panes = [
      { menuItem: '资讯', render: () => <Tab.Pane><Zixun/></Tab.Pane>},
      { menuItem: '头条', render: () => <Tab.Pane><Toutiao/></Tab.Pane>},
      { menuItem: '问答', render: () => <Tab.Pane><Wenda/></Tab.Pane>}
    ];
    return (
      <div className='find-container'>
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes}/>
        </div>
      </div>
    );
  }
}
export default Info;