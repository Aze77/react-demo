/*
  利率计算器
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Tab, Grid, Dropdown, Input, Button } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';

// 统计图表组件
class CalcChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cdata: [
        {value:335, name:'贷款总额'},
        {value:310, name:'支付利息'}
      ]
    }
  }
  updateChart = () => {
    // 更新图表
    let { total } = this.props;
    let data = [...this.state.cdata];
    data[0].value = data[0].value + parseInt(total);
    this.setState({
      cdata: data
    }, ()=>{
      // 更新图表
      // this是组件CalcChart的实例对象
      // 获取图表组件ReactEcharts的实例对象
      let chartCom = this.mychart;
      // 获取echarts实例对象
      let echart = chartCom.getEchartsInstance();
      // 更新图表（只能通过setOption方法更新图表）
      let opts = this.getOptions();
      echart.setOption(opts);
    });
  }
  getOptions = () => {
    // 用来提供图表的配置信息
    return {
      title : {
        text: '贷款数据统计',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{c}"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['贷款总额','支付利息']
      },
      series : [{
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: this.state.cdata,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  }
  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Button onClick={this.updateChart} fluid color='green'>计算</Button>
        </Grid.Column>
        <Grid.Column width={16}>
          {/*这个位置放置图表*/}
          <ReactEcharts ref={(e)=>{this.mychart = e;}} option={this.getOptions()}/>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

// 公积金贷款组件
class Gongjijin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '1',
      total: 0,
      year: 1,
      rate: 1
    }
  }
  handleType = (e, {value}) => {
    // let {value} = p;
    this.setState({
      type: value
    });
  }
  handleTotal = (e) => {
    this.setState({
      total: e.target.value
    });
  }
  handleYear = (e, {value}) => {
    this.setState({
      year: value
    });
  }
  handleRate = (e, {value}) => {
    this.setState({
      rate: value
    });
  }
  render() {
    // 贷款方式数据
    let types = [
      { key: '1', text: '按房价总额', value: '1' },
      { key: '2', text: '按贷款总额', value: '2' },
    ];
    // 动态生成贷款年限的数据
    let generateYears = (n) => {
      let years = [];
      for(let i = 1; i <= n; i++) {
        let year = {
          key: i,
          text: i,
          value: i
        }
        years.push(year);
      }
      return years;
    }
    // 贷款利率的数据
    let rates = [
      {key: 1,text: '基准利率(3.25%)',value: 1},
      {key: 2,text: '基准利率9.5折',value: 2},
      {key: 3,text: '基准利率9折',value: 3},
      {key: 4,text: '基准利率8.5折',value: 4}
    ]
    let {type, total, year, rate} = this.state;
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款方式
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.type} onChange={this.handleType} fluid selection options={types}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款总额
          </Grid.Column>
          <Grid.Column width={10}>
            <Input fluid value={this.state.total} onChange={this.handleTotal} placeholder='贷款总额...' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款年限
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.year} onChange={this.handleYear} fluid selection options={generateYears(25)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款利率
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.rate} onChange={this.handleRate} fluid selection options={rates}/>
          </Grid.Column>
        </Grid.Row>
        {/*添加图表效果*/}
        <CalcChart type={type} total={total} year={year} rate={rate}/>
      </Grid>
    );
  }
}

// 计算器基本组件布局
class HomeCalc extends React.Component {
  // 控制页面回退
  handleBack = () => {
    let {history} = this.props;
    history.goBack();
  }
  render () {
    let tabData = [
      {
        menuItem: '公积金贷款',
        render: () => <Tab.Pane><Gongjijin/></Tab.Pane>
      },
      {
        menuItem: '商业贷款',
        render: () => <Tab.Pane>商业贷款</Tab.Pane>
      },
      {
        menuItem: '组合贷款',
        render: () => <Tab.Pane>组合贷款</Tab.Pane>
      }
    ];
    return (
      <div className='home-calc'>
        <div className = "home-calc-title">
          <Icon onClick={this.handleBack} name='angle left' size = 'large'/>贷款利率计算 
        </div> 
        <div className = "map-calc-content">
          {/* Tab布局 */}
          <Tab panes={tabData}/>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeCalc);
