/*
  地图找房
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xy: [{
        'x': 116.43244,
        'y': 39.929986
      }, {
        'x': 116.424355,
        'y': 39.92982
      }, {
        'x': 116.423349,
        'y': 39.935214
      }, {
        'x': 116.350444,
        'y': 39.931645
      }, {
        'x': 116.351684,
        'y': 39.91867
      }, {
        'x': 116.353983,
        'y': 39.913855
      }, {
        'x': 116.357253,
        'y': 39.923152
      }, {
        'x': 116.349168,
        'y': 39.923152
      }, {
        'x': 116.354954,
        'y': 39.935767
      }, {
        'x': 116.36232,
        'y': 39.938339
      }, {
        'x': 116.374249,
        'y': 39.94625
      }, {
        'x': 116.380178,
        'y': 39.953053
      }]
    }
  }
  handle = () => {
    // 回退一步
    let {history} = this.props;
    history.goBack();
  }
  
  // 初始化地图
  initMap = () => {
    // 初始化地图
    // 全局作用域中的成员要通过window进行访问
    let BMap = window.BMap;
    // 创建Map实例
    let map = new BMap.Map("allmap"); 
    // 初始化地图,设置中心点坐标和地图缩放级别   
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // 实现点聚合效果
    let markers = [];
    this.state.xy.forEach(item=>{
      let pt = new BMap.Point(item.x, item.y);
      markers.push(new BMap.Marker(pt));
    });
    // 实现点的聚合效果
    new window.BMapLib.MarkerClusterer(map, {markers: markers,
      girdSize: 100,
      styles: [{
        background: 'rgba(12,181,106,0.9)',
        size: new BMap.Size(92, 92),
        textSize: '16',
        textColor: '#fff',
        borderRadius: 'true'
      }],
    });
  }

  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <div className = 'map-house' >
        <div className = "map-house-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/> 地图找房 
        </div> 
        <div className = "map-house-content" id='allmap'></div>
      </div>
    );
  }
}
export default withRouter(HomeMap);