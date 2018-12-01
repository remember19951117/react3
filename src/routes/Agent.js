import React,{Component} from 'react';
import {connect} from 'dva';
import * as User from "../services/user";
import {loggedIn} from "../utils/fetch";
import { routerRedux } from 'dva/router';
import { Checkbox } from 'antd';
import { List, InputItem, Toast ,Picker,TextareaItem} from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
import styles from './style/Agent.less';
import Title from '../components/Title';
import left from '../assets/icon-img/return.png';
const cityData  = require('../ssx');
@connect(state => ({
  user: state.user
}))
export default class Agent extends Component {
  state={
    pickerValue:"",
    visible1: false,
    visible2: false,
    reason:"",
    pickerShop:"",
    types:[],
    checked:false,
  }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  componentWillMount(){
    const { dispatch} = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
    }
  }
  onChange=(e)=>{
    if(e.target.checked){
      this.setState({
        checked:true,
      })
    }else{
      this.setState({
        checked:false,
      })
    }
  }
  componentDidMount(){
    window.addEventListener('resize',()=>this.resize(),100);
  }
  resize(){
    if (document.activeElement.tagName == 'INPUT') {
      document.activeElement.scrollIntoViewIfNeeded();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize',()=>this.resize());
  }
  componentWillReceiveProps(props){
    const {user}=props;
    const data=user.Typelist;
    const oldtypes=this.state.types;
    if(user.userInfo.us_id_card!=="" && user.userInfo.us_nickname!=="" && user.userInfo.us_tel!==""){
      if(oldtypes==0){
        data.map((type)=>oldtypes.push({label: type.ca_name,value:type.id}))
      }
      this.setState({
        types:oldtypes
      })
    }else{
      Toast.offline("请先完善资料,2秒后跳转",2,()=>{
        this.returnGoBack()
      })
    }
  }
  getSel() {
      const value = this.state.pickerValue;
      if (!value) {
        return '';
      }
      const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
      return treeChildren.map(v => v.label).join(',');
  }
  getType(){
    const value = this.state.pickerShop;
  }
  //判断是否符合提交申请条件
  // decide(){
  //   const {user}=this.props;
  //   if(user.userInfo.us_id_card!=="" && user.userInfo.us_nickname!=="" && user.userInfo.us_tel!==""){
  //     this.agent()
  //   }else{
  //     Toast.offline("请先完善资料,2秒后跳转",2,()=>{
  //       this.returnGoBack()
  //     })
  //   }
  // }
  //提交申请
  async agent(){
    const {dispatch } = this.props;
    let flag=this.state.checked;
    let reaso=this.state.reason;
    let type=this.state.pickerShop[0];
    var data = {
      "us_addr_code": this.state.pickerValue,
      "ca_id":type,
      "us_reason":reaso,
      "area" : "",
      "city" : "郴州",
      "province" : "湖南",
    }
    const cityData = this.state.pickerValue;
    if(cityData.length===2){
        const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
        data.province = cityArr[0];
        data.city = cityArr[1];
    }else if(cityData.length===3){
        const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
        data.province = cityArr[0];
        data.city = cityArr[1];
        data.area = cityArr[2];
    }else{
        Toast.offline("请选择所在地区!",1);
        return;
    }
    if(type===""){
      Toast.offline("请选择商品类型!",1);
        return;
    }
    if(cityData===""||reaso===""||type==="") {
      Toast.offline("数据不能为空",2);
      return;
    }else{
      if(flag){
        const datas =await User.Agent({data:data});
        if(datas.code===1){
          Toast.success(datas.msg, 1, await function(){
            dispatch(
              routerRedux.goBack()
            )
          })
        }else{
          Toast.fail(datas.msg, 2,()=>{
            this.returnGoBack()
          });
        }
      }else{
        Toast.offline("请先阅读代理商注册协议",2);
      }
    }
  } 
  inputReason(value){
    this.setState({reason:value});
  }
  render(){
   // 顶部title参数
   const Titles = {
    tit: "申请代理",
    lbgimg:'url(' + left + ')',
  }
  const {types}=this.state;
  const {user,history}=this.props;
    return (
      <div className={styles.App}>
        <style>{`
          .am-list-item{
            height:1.2rem;
            align-items:center;
          }
          .am-list-item.am-list-item-middle .am-list-line{
            padding-right:.3rem;
            position:relative;
          }
          .am-list-item .am-list-line .am-list-content{
            flex:none;
            width:30%;
            font-size:.3rem;
            color:#959595;
            letter-spacing:.01rem;
          }
          .am-list-item .am-list-line .am-list-extra{
            flex:none;
            width:70%;
            font-size:.3rem;
            color:#959595;
            text-align:center;
            height:.73rem;
            border-radius:.1rem;
            border: solid .02rem #cacaca;
            padding: 0 .3rem;
            line-height:.73rem;
          }
          .am-list-item.am-input-item{
            height:1.2rem;
          }
          .am-list-item .am-input-control input{
            width:100%;
            color:#070707;
          }
          html:not([data-scale]) .am-list-body::after,html:not([data-scale]) .am-list-body::before,html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
            content:"";
            height:0;
          }
          .am-list-item .am-input-clear{
            position:absolute;
            top:50%;
            right:.5rem;
            transform:translateY(-50%);
            overflow:initial;
            box-sizing:border-box;
          }
          .am-list-item .am-input-label{
            color:#959595;
            font-size:.3rem;
            margin:0;
          }
          .am-list-item .am-input-label.am-input-label-5{
            width:30%;
          }
          .am-list-item .am-input-control input{
            width: 100%;
            height:.73rem;
            border-radius:.1rem;
            border: solid .02rem #cacaca;
            padding: 0 .3rem;
            font-size:.28rem;
          }
          .am-input-focus .am-input-control input{
            border: solid .02rem #20a3ff;
          }
          .am-textarea-label.am-textarea-label-5{
            width:32%;
            font-size:.3rem;
            color:#959595;
            letter-spacing:.01rem;
            margin:0;
            line-height:.5rem;
            padding-left:15px;
          }
          .am-textarea-control,.am-textarea-has-count{
            padding:0;
            height:3.1rem;
            margin-top:.15rem;
          }
          .am-textarea-control textarea{
            width:93%;
            height:3rem;
            border-radius:.1rem;
            border: solid .02rem #cacaca;
            padding:.1rem;
            font-size:.28rem;
            line-height:.35rem;
          }
          .am-textarea-count{
            bottom:.05rem;
            right:.4rem;
          }
          .Agreement{
            padding:0;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:.5rem;
          }
          .ant-checkbox-wrapper{
            margin-right:.1rem;
          }
        `}</style>
          { /* 顶部title */ }
          <Title {...Titles} leftFunc={ this.returnGoBack } />
          <div className={styles.main}>
            <List>
                <InputItem
                  ref="idcard"
                  maxLength='26'
                  value={user.userInfo.us_id_card}
                  editable={false}
                ><div>身份证号码</div></InputItem>
                <InputItem
                  ref="name"
                  maxLength='10'
                  editable={false}
                  value={user.userInfo.us_nickname}
                ><div>真实姓名</div></InputItem>
                <InputItem
                  ref="phone"
                  maxLength='11'
                  editable={false}
                  value={user.userInfo.us_tel}
                ><div>手机号</div></InputItem>
            </List>
            <Picker
                visible={this.state.visible1}
                data={cityData.globalData}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={() => this.setState({ visible1: false })}
                onDismiss={() => this.setState({ visible1: false })}>
                <List.Item ref="cityInfo" extra={this.getSel()} onClick={() => this.setState({ visible1: true })}>所在地区</List.Item>
            </Picker>
            <Picker
                visible={this.state.visible2}
                data={types.length>0?types:""}
                cols={1}
                value={this.state.pickerShop}
                onChange={v => this.setState({ pickerShop: v })}
                onOk={() => this.setState({ visible2: false })}
                onDismiss={() => this.setState({ visible2: false })}>
                <List.Item ref="type" extra={this.getType()} onClick={() => this.setState({ visible2: true })}>代理产品</List.Item>
            </Picker>
            <TextareaItem
              title="申请理由"
              placeholder="请输入申请代理商理由"
              data-seed="logId"
              rows={3}
              count={100}
              onChange={(value)=>this.inputReason(value)}
              ref="agent"/>
              <div className="Agreement">
                <div>
                  <Checkbox onChange={(e)=>this.onChange(e)}></Checkbox>请确认已阅读<span onClick={()=>history.push('/gvrp')} style={{color:'#0973ea',padding:0}}>代理商注册协议</span>
                </div>
              </div>
          </div>
          <div className={styles.menus} onClick={()=>this.agent()}>申请</div>
      </div>
    )
  }
}
