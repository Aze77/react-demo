/*
  我的
*/
import React from 'react';
import cfg from '../../common.js';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';
import './My.css';
import axios from 'axios';

// 选择图片的弹窗
class SelectImageWindow extends React.Component {
  constructor(props) {
    super(props);
    // 通过非受控组件的方式操作DOM
    this.fileRef = React.createRef();
  }
  getImage = () => {
    // 获取选择的图片，去进行裁切
    let img = this.fileRef.current.files[0];
    // 隐藏当前弹窗、显示裁切图片弹窗
    if(!img) {
      // 没有选择图片
      this.props.close(1);
    } else {
      // 选择了图片
      this.props.close(2, img);
    }
  }
  render() {
    let { open, close } = this.props;
    return (
      <Modal size='small' open={open} onClose={close}>
        <Modal.Header>选择图片</Modal.Header>
        <Modal.Content>
          <input type="file" ref={this.fileRef}/>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.getImage} positive icon='checkmark' labelPosition='right' content='确定' />
        </Modal.Actions>
      </Modal>
    );
  }
}

// 裁切图片的弹窗
class CropImageWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      editor: null
    }
  }
  handleScale = (e) => {
    // 控制比例的变化
    this.setState({
      scale: parseFloat(e.target.value)
    });
  }
  handleEditor = (editor) => {
    // 初始化裁切组件的实例对象
    // 参数editor表示AvatarEditor组件的实例对象
    this.editor = editor;
  }
  submitAvatar = () => {
    // 裁切好的头像进行提交
    let canvas = this.editor.getImageScaledToCanvas();
    // 把裁切好的图片转化为Base64形式的数据
    let img = canvas.toDataURL();
    // 把图片数据提交到服务器
    axios.post('my/avatar', {
      avatar: img
    }).then(res=>{
      if(res.meta.status === 200) {
        // 头像裁切成功，更新页面中的头像图片
        this.props.updateAvatar(img);
      }
    })
  }
  render() {
    let { open, close, targetImage } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>裁切图片</Modal.Header>
          <Modal.Content>
            <AvatarEditor
              ref={this.handleEditor}
              image={targetImage}
              width={150}
              height={150}
              border={50}
              color={[255, 255, 255, 0.6]}
              rotate={0}
              scale={this.state.scale}
            />
            <div>
              <span className='avatar-zoom'>缩放:</span>
              <input
                name="scale"
                type="range"
                onChange={this.handleScale}
                min='1'
                max='2'
                step="0.01"
                defaultValue="1"
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.submitAvatar} positive icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      avatar: '',
      // 控制选择图片弹窗的状态位
      selectFlag: false,
      // 控制裁切图片弹窗的状态位
      cropFlag: false,
      // 选中的图片，从子组件传递过来
      selectedImag: null
    }
  }
  componentDidMount() {
    // 调用接口初始化用户信息
    let uid = sessionStorage.getItem('uid');
    axios.post('my/info', {
      user_id: uid
    }).then(res=>{
      this.setState({
        uname: res.data.username,
        avatar: res.data.avatar
      });
    })
  }
  showSelectWindow = () => {
    // 控制选择图片的弹窗显示
    this.setState({
      selectFlag: true
    });
  }
  hideSelectWindow = (flag, img) => {
    // 控制选择图片的弹窗隐藏
    if(flag === 1) {
      // 没有选择图片，仅仅关闭当前弹窗
      this.setState({
        selectFlag: false
      });
    } else if(flag === 2) {
      // 选择了图片，关闭当前弹窗，打开裁切弹窗
      this.setState({
        selectFlag: false,
        cropFlag: true,
        selectedImag: img
      });
    }
  }
  hideCropWindow = () => {
    // 控制裁切图片弹窗的隐藏
    this.setState({
      cropFlag: false
    });
  }
  showCropWindow = () => {
    // 控制裁切图片弹窗的显示
    this.setState({
      cropFlag: true
    });
  }
  updateAvatar = (img) => {
    // 更新头像，并且隐藏窗口
    this.setState({
      avatar: img,
      cropFlag: false
    });
  }
  render() {
    return (
      <div className="my-container">
        <SelectImageWindow close={this.hideSelectWindow} open={this.state.selectFlag}/>
        <CropImageWindow updateAvatar={this.updateAvatar} targetImage={this.state.selectedImag} close={this.hideCropWindow} open={this.state.cropFlag}/>
        <div className='my-title'>
          <img src={cfg.baseURL+'public/my-bg.png'} alt='me'/>
          <div className="info">
            <div className="myicon">
              <img onClick={this.showSelectWindow} src={this.state.avatar} alt="icon"/>
            </div>
            <div className='name'>{this.state.uname}</div>
            <Button color='green' size='mini'>已认证</Button>
            <div className='edit'>编辑个人资料</div>
          </div>
        </div>
        <Grid padded className='my-menu'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name='clock outline' size='big' />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='yen sign' size='big' />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='bookmark outline' size='big' />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='user outline' size='big' />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='home' size='big' />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='microphone' size='big' />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className='my-ad'>
          <img src={cfg.baseURL+'public/ad.png'} alt=""/>
        </div>
      </div>
    );
  }
}
export default My;