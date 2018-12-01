import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from "../utils/fetch";
import arrayTreeFilter from 'array-tree-filter';
import {List,InputItem,TextareaItem,Toast,Picker} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Addsite.less';
import left from '../assets/icon-img/return.png';
import right from '../assets/icon-img/news.png';
const cityData  = require('../ssx');
@connect(state => ({
  user: state.user
}))

export default class Addsite extends Component {
  state={
    data: [],
    pickerValue: [],
    visible: false,
    flag:1,
    tel:"",
    username:"",
    site:""
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
      }
  }
  componentDidMount(){
    const { user ,location} = this.props;
    const queryString = require('query-string');
    if(location.search!==""){
      const parsed = queryString.parse(location.search);
      if(parsed.id && user.addressInfo){
        this.refs.recipient.state.value = user.addressInfo.addr_receiver;
        this.refs.telephone.state.value = user.addressInfo.addr_tel;
        this.refs.address.state.value = user.addressInfo.addr_detail;
        this.setState({pickerValue: user.addressInfo.addr_code,flag:0});
      }
    }
  }
  componentWillReceiveProps(nextProps){
    const { user ,location} = nextProps;
    const queryString = require('query-string');
    if(location.search!==""){
      const parsed = queryString.parse(location.search);
      if(user.addressInfo.id && parsed.id){
        this.refs.recipient.state.value = user.addressInfo.addr_receiver;
        this.refs.telephone.state.value = user.addressInfo.addr_tel;
        this.refs.address.state.value = user.addressInfo.addr_detail;
        this.setState({pickerValue: user.addressInfo.addr_code,flag:0});
      }
    }
  }
  imputUsername(value){
    this.setState({
      username:value
    })
  };
  inputTel(value){
    this.setState({
      tel:value
    })
  };
  inputSite(value){
    this.setState({
      site:value
    })
  }
  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: cityData.globalData,
      });
    }, 120);
}
getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
}
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }

  //添加地址
  async addsite(){
    const {dispatch } = this.props;
    const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    let name=this.state.username;
    let tel=this.state.tel;
    let siteinfo=this.state.site;
    let data = {
      "addr_code": this.state.pickerValue,
      "addr_receiver": name,
      "addr_tel": tel,
      "addr_detail":siteinfo,
      "area" : "",
      "city" : "郴州",
      "province" : "湖南",
    }
    const cityData = this.state.pickerValue;
    if(name===""){
      Toast.offline("请输入收货人姓名!",1);
      return;
    }
    if(!mobile.test(this.state.tel)){
      Toast.offline("请输入11位正确手机号!",1);
      return;
    }
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
        Toast.offline("请选择地区!",1);
        return;
    }
    if(siteinfo===""){
      Toast.offline("请输入详细地址",1);
      return
    }
    const datas =await User.addSite({data:data});
    if(datas.code===1){
      Toast.success(datas.msg, 1, await function(){
        dispatch(
          routerRedux.goBack()
        )
      })
    }else{
      Toast.fail(datas.msg, 2);
    }
  }
  //修改地址
  async editsite(){
    const {dispatch,user} = this.props;
    const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    let id=user.addressInfo.id;
    let name=this.refs.recipient.state.value;
    let tel=this.refs.telephone.state.value;
    let siteinfo=this.refs.address.state.value;
    var data = {
      "addr_code": this.state.pickerValue,
      "addr_receiver": name,
      "addr_tel": tel,
      "addr_detail":siteinfo,
      "id":id,
      "area" : "",
      "city" : "郴州",
      "province" : "湖南",

    }
    const cityData = this.state.pickerValue;
    if(name===""){
      Toast.offline("请输入收货人姓名!",1);
      return;
    }
    if(!mobile.test(tel)){
      Toast.offline("请输入11位正确手机号!",1);
      return;
    }
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
        Toast.offline("请选择地区!",1);
        return;
    }
    if(siteinfo===""){
      Toast.offline("请输入详细地址",1);
      return
    }
    const datas =await User.subAddress({data:data});
    if(datas.code===1){
      Toast.success(datas.msg, 1, await function(){
        dispatch(
          routerRedux.goBack()
        )
      })
    }else{
      Toast.fail(datas.msg, 2);
    }
  }
  render(){
    // 顶部title参数
    const Titles = {
      tit: "添加地址",
      lbgimg:'url(' + left + ')',
      rbgimg:'url(' + right + ')',
    }
    return (
      
      <div className={styles.App}>
        <style>
            {`
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
              .am-list-item .am-list-line .am-list-extra,.am-list-item .am-input-control input{
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
              .am-textarea-label.am-textarea-label-5{
                width:32%;
                font-size:.3rem;
                color:#959595;
                letter-spacing:.01rem;
                margin:0;
                line-height:1.8rem;
                padding-left:.3rem;
              }
              .am-textarea-control,.am-textarea-has-count{
                padding:0;
                height:1.8rem;
              }
              .am-textarea-control textarea{
                width:94%;
                line-height:.6rem;
              }
            `}
        </style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main}>
          <List>
            <InputItem
              clear
              maxLength='10'
              onChange={(val)=>this.imputUsername(val)}
              placeholder="请输入姓名"
              ref="recipient"
            >姓名</InputItem>
            <InputItem
              type="number"
              placeholder="请输入电话"
              maxLength='11'
              onChange={(val)=>this.inputTel(val)}
              clear
              ref="telephone"
            >联系电话</InputItem>
          </List>
          <Picker
              visible={this.state.visible}
              data={cityData.globalData}
              value={this.state.pickerValue}
              onChange={v => this.setState({ pickerValue: v })}
              onOk={() => this.setState({ visible: false })}
              onDismiss={() => this.setState({ visible: false })}>
              <List.Item ref="cityInfo" extra={this.getSel()} onClick={() => this.setState({ visible: true })}>所在地区</List.Item>
          </Picker>
          <TextareaItem
              title="详细地址"
              placeholder="输入详细地址"
              data-seed="logId"
              rows={3}
              count={40}
              onChange={(val)=>this.inputSite(val)}
              ref="address"/>
        </div>
        <div className={styles.menus} onClick={this.state.flag===1?()=>this.addsite():()=>this.editsite()}>保存</div>
      </div>
    )

  }
}




