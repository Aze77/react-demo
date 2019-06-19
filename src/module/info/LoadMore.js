/*
  加载更多的通用组件
*/
import React from 'react';
import { Item, Icon, Button, Modal,TextArea } from 'semantic-ui-react';
import Tloader from 'react-touch-loader';
import axios from 'axios';
import cfg from '../../common.js';
import './LoadMore.css';

// 封装弹窗组件
class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ''
    }
  }
  handleSubmit = () => {
    // 调用接口进行发问
    axios.post('infos/question', {
      question: this.state.question
    }).then(res=>{
      // console.log(res);
      // 关闭弹窗
      this.props.close();
    })
  }
  handleQuestion = (e) => {
    this.setState({
      question: e.target.value
    });
  }
  render() {
    let { open, close } = this.props;
    return (
      <Modal open={open} onClose={close}>
        <Modal.Header>发布问题</Modal.Header>
        <Modal.Content>
          <TextArea value={this.state.value} onChange={this.handleQuestion} placeholder='请发问...' />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close} negative>
            取消
          </Button>
          <Button
            onClick={this.handleSubmit}
            positive
            labelPosition='right'
            icon='checkmark'
            content='发布'
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

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

// 封装一个通用的列表组件
class CommonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  // componentDidMount() {
  //   let { type } = this.props;
  //   // 调用后台接口初始化数据
  //   axios.post('infos/list', {
  //     // pagenum表示当前第几条数据
  //     pagenum: this.state.pagenum,
  //     // 每页查询多少条
  //     pagesize: this.state.pagesize,
  //     // 数据的类型：1表示资讯；2表示头条；3表示问答
  //     type: type
  //   }).then(res=>{
  //     // 更新state中的数据
  //     if(res.meta.status === 200) {
  //       this.setState({
  //         list: res.data.list.data,
  //         total: res.data.list.total
  //       });
  //     }
  //   })
  // }
  showBox = () => {
    // 控制弹窗显示
    this.setState({
      open: true
    });
  }
  handleClose = () => {
    // 控制弹窗关闭
    this.setState({
      open: false
    });
  }
  render() {
    let { type, listData } = this.props;
    let tpl = null;
    if(type === 3) {
      // 问答的模板
      let wdList = listData.map(item=>{
        let tags = item.question_tag&&item.question_tag.split(',').map((tag,index)=>{
          return (
            <span key={index}>{tag}X</span>
          );
        });
        return (
          <li key={item.id}>
            <div className='title'>
              <span className='cate'>
                <Icon color='green' name='users' size='small' />
                思维
              </span>
              <span>
                {item.question_name}
              </span>
            </div>
            <div className='user'>
              <Icon circular name='users' size='mini'/>
              {item.username} 的回答
            </div>
            <div className="info">
              {item.answer_content}
            </div>
            <div className="tag">
              {tags?tags:''}
              <span>{item.qnum}个回答</span>
            </div>
          </li>
        );
      });
      tpl = (
        <div>
          <QuestionModal close={this.handleClose} open={this.state.open}/>
          <div className='info-ask-btn'>
            <Button onClick={this.showBox} fluid color='green'>快速提问</Button>
          </div>
          <ul className='info-ask-list'>
            {wdList}
          </ul>
        </div>
      );
    } else if(type === 1 || type === 2) {
      // 资讯和头条的模板
      let zxOrttList = listData.map(item=>{
        return (
          <Item key={item.id}>
            <Item.Image size='small' src={cfg.baseURL + 'public/1.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header className='info-title'>{item.info_title}</Item.Header>
              <Item.Meta>
                <span className='price'>$1200</span>
                <span className='stay'>1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      });
      tpl = (
        <Item.Group unstackable>
          {zxOrttList}
        </Item.Group>
      );
    }
    return tpl;
  }
}

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      initializing: 1,
      // 列表数据
      list: [],
      // 列表的总数
      total: 0,
      // 当前的记录数
      pagenum: 0,
      // 每页显示条数
      pagesize: 2
    }
  }

  loadData = () => {
    let { type } = this.props;
    // console.log(this.state.pagenum, this.state.total)
    // if(this.state.pagenum >= this.state.total) {
    //   return;
    // }
    // 调用后台接口初始化数据
    
    return axios.post('infos/list', {
      // pagenum表示当前第几条数据
      pagenum: this.state.pagenum,
      // 每页查询多少条
      pagesize: this.state.pagesize,
      // 数据的类型：1表示资讯；2表示头条；3表示问答
      type: type
    }).then(res=>{
      // 更新state中的数据
      if(res.meta.status === 200) {
        // 复制原有的数据
        let list = [...this.state.list];
        if(this.state.pagenum === 0) {
          // 覆盖原有数据
          list = res.data.list.data;
        } else {
          // 加载更多，进行累加操作
          list = [...list, ...res.data.list.data];
        }
        this.setState({
          list: list,
          total: res.data.list.total,
          hasMore: this.state.pagenum < res.data.list.total,
          initializing: 2
        });
      }
    })
  }

  componentDidMount () {
    // 初始化列表数据
    this.loadData();
  }

  // 刷新触发
  reFresh = (resolve, reject) => {
    // 重置请求参数，并且重新调用接口
    this.setState({
      pagenum: 0,
      initializing: 1
    }, () => {
      // 必须放到回调函数中进行数据刷新
      this.loadData();
    });
    resolve();
  }
  // 加载更多触发
  loadMore = (resolve, reject) => {
    // 控制加载更多数据
    // 控制pagenum进行累加操作
    // 控制结束条件
    let { pagenum, pagesize } = this.state;
    this.setState({
      pagenum: pagenum + pagesize
    }, ()=>{
      // 加载更多数据:当前的记录数如果大于等于总条数表示没有更多数据了
      if(this.state.pagenum>=this.state.total && this.state.total!==0) {
        this.setState({
          hasMore: false,
          initializing: 2
        });
        resolve();
        return ;
      }
      this.loadData().then(res=>{
        resolve();
      })
    });
  }
  render() {
    let { type } = this.props;
    let { hasMore, initializing, list } = this.state;
    return (
      <div className="view">
        <Tloader className='main'
            hasMore={hasMore}
            initializing={initializing}
            onRefresh={this.reFresh}
            onLoadMore={this.loadMore}
            autoLoadMore={false}
          >
          {/* 列表信息 */}
          <CommonList type={type} listData={list}/>
        </Tloader>
      </div>
    );
  }
}

export default LoadMore;
