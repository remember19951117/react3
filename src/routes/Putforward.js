import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {loggedIn} from "../utils/fetch";
import { routerRedux} from 'dva/router';

import {InputItem,Toast} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Putforward.less';
import left from '../assets/icon-img/return.png';
import icon01 from '../assets/icon-img/no-select.png';
import icon02 from '../assets/icon-img/select.png'
@connect(state => ({
  user: state.user
}))
export default class Putforward extends Component {
  state={
    src:1,
    srcflag:1,
    defultmoney:"",
    alipay:"",
    wechat:"",
    bankcard:"",
    charge:0.00,
    money:0.00
  }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
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
  imputmoney(value){
    if(value<300){
      this.setState({
        srcflag:1
      })
      this.refs.bankcard.state.value=""
    }
    this.setState({
      defultmoney:value,
      charge:Math.round(parseFloat((value*.06)*100))/100,
      money:Math.round(parseFloat(value*100))/100,
    })
  }
  imputalipay(value){
    this.setState({
      alipay:value
    })
  }
  imputwechar(value){
    this.setState({
      wechat:value
    })
  }
  imputbank(value){
    this.setState({
      bankcard:value
    })
  }
  //提现
  async alipay(){
    const{user,dispatch}=this.props;
    const data=user.payInfo;
    const _this=this;
    let allmoney=data.us_shop_bi;
    const charge = this.state.charge;
    let poymoney=Number(this.refs.paymoney.state.value)+Number(charge);
    let actualmoney=this.state.money;
    let day=this.state.src===1?0:(this.state.src===2?1:"");
    let paytype=this.state.srcflag===1?1:(this.state.srcflag===2?2:(this.state.srcflag===3?0:""));
    let paynumber=this.refs.alipay.state.value||this.refs.wechat.state.value||this.refs.bankcard.state.value;
    if(poymoney===""){
      Toast.offline("提现金额不能为空",2);
    }else{
      if(poymoney<=allmoney && paynumber!==""){
        const datas =await User.Payforward({tx_num:actualmoney,get_type:day,tx_type:paytype,tx_account:paynumber,tx_need:poymoney});
        if(datas.code===1){
            Toast.success(datas.msg, 2, await function(){
              if(_this.state.srcflag===1){
                dispatch(routerRedux.push('/addfriend?id=1'));
              }else if(_this.state.srcflag===2){
                dispatch(routerRedux.push('/addfriend?id=2'));
              }else{
                dispatch(routerRedux.goBack());
              } 
            })
            }else{
              Toast.fail(datas.msg, 2);
            }
      }else{
        Toast.offline("提现金额不能超出可提金额",2);
      }
    }
    if(paynumber===""){
      Toast.offline("提现账号不能为空",2);
    }
  }
  componentWillUpdate(){
    if(this.state.srcflag===1){
      this.refs.wechat.state.value="";
      this.refs.bankcard.state.value="";
    }else if(this.state.srcflag===2){
      this.refs.alipay.state.value="";
      this.refs.bankcard.state.value="";
    }else if(this.state.srcflag===3){
      this.refs.alipay.state.value="";
      this.refs.wechat.state.value="";
    }
  }
  render(){
    const{user}=this.props;
    const data=user.payInfo
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "提现申请",
      lbgimg:'url(' + left + ')',
      titcolor:'#fff'
    }
    return (
      <div className={styles.App}>
        <style>{`
          .am-list-item.am-input-item{
            padding-left:.5rem;
          }
          .am-list-item .am-input-label.am-input-label-5{
            width:1.5rem;
          }
          .am-list-item .am-input-label{
            font-size: .25rem;
            color: #656565;
            margin:0;
          }
          .am-list-item .am-input-control input{
            width: 100%;
            height: .67rem;
            border-radius: .1rem;
            border: solid .02rem #cacaca;
            padding: 0 .3rem;
          }
          .am-list-item .am-list-line{
            padding-right:.5rem;
            position:relative;
          }
          html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
            content:"";
            height:0;
          }
          .am-list-item .am-input-clear{
            position:absolute;
            top:50%;
            right:.6rem;
            transform:translateY(-50%);
            overflow:initial;
            box-sizing:border-box;
          }
        `}</style>
          { /* 顶部title */ }
          <Title { ...Titles} leftFunc={ this.returnGoBack }/>
          <div className={styles.main}>
            <h2>当前可提现余额</h2>
            <h2 className={styles.money}>￥{data.us_shop_bi}</h2>
            <p>
              <span className={styles.color}>申请提现说明：300元</span>
              <span>以下申请微信或支付宝，</span>
              <span className={styles.color}>300元</span>
              <span>以上申请提现到银行卡，手续费按照</span>
              <span className={styles.color}>6%</span>
              <span>收取</span>
            </p>
            <InputItem
                onChange={(val)=>this.imputmoney(val)}
                maxLength={20}
                ref="paymoney"
                type="money"
                placeholder="￥0.00"
              >提现金额</InputItem>
            <div>
              <span>提现方式</span>
              <div className={styles.selectpay}>
                <div className={styles.alipay} onClick={()=>this.setState({srcflag:1})}>
                  <img src={this.state.srcflag===1?icon02:icon01} alt=""/>
                  <span>支付宝</span>
                </div>
                <div className={styles.wechat} onClick={()=>this.setState({srcflag:2})}>
                  <img src={this.state.srcflag===2?icon02:icon01} alt=""/>
                  <span>微信</span>
                </div>
                <div className={styles.bank} onClick={()=>{if(this.state.defultmoney>=300){this.setState({srcflag:3})}}}>
                  <img src={this.state.srcflag===3?icon02:icon01} alt=""/>
                  <span>银行卡</span>
                </div>
              </div>
            </div>
            <div className={styles.item} style={{display:this.state.srcflag===1?'block':'none'}}>
              <p>系统支付宝账号：<span>{data.alipay_num}</span></p>
              <InputItem
                clear
                onChange={(val)=>this.imputalipay(val)}
                maxLength={20}
                ref="alipay"
                >支付宝账号</InputItem>
            </div>
            <div className={styles.item} style={{display:this.state.srcflag===2?'block':'none'}}>
              <p>系统微信账号：<span>{data.wepay_num}</span></p>
              <InputItem
                  clear
                  onChange={(val)=>this.imputwechar(val)}
                  maxLength={20}
                  ref="wechat"
                >微信账号</InputItem>
            </div>
            <div className={styles.item} style={{display:this.state.srcflag===3?'block':'none'}}>
              <InputItem
                clear
                type="bankCard"
                maxLength={24}
                onChange={(val)=>this.imputbank(val)}
                ref="bankcard"
                >银行卡号</InputItem>
            </div>
            <div className={styles.cost}>
              <p>提现手续费：￥<span>{this.state.charge}</span></p>
            </div>
            <div className={styles.cost}>
              <p>实际到账金额：￥<span>{this.state.money}</span></p>
            </div>
          </div>
          <div className={styles.menus} onClick={()=>this.alipay()}>提现</div>
      </div>
    )

  }
}





