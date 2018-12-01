import React,{Component} from 'react';

import * as Goods from "../services/goods";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn} from "../utils/fetch";

import {Toast} from 'antd-mobile';
import Title from '../components/Title';
import Payorder from '../components/payorder';
import styles from './style/Payment.less';
import left from '../assets/icon-img/return.png';
import right from '../assets/icon-img/news.png';
import icon01 from '../assets/icon-img/no-select.png';
import icon02 from '../assets/icon-img/select.png';
import icon03 from '../assets/icon-img/location.png';
var queryString = require('querystring');
@connect(state => ({
  goods: state.goods
}))

export default class Payment extends Component {
  state={
    flag:0,
    srcflag:1,
    wxConfig:{},
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
    }
  }
  componentWillReceiveProps(props){
    const {goods}=props;
    if(goods.shopSecList[0].addr_detail){
      this.setState({
        flag:1
      })
    }
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/shopinfo?id='+val));
    }
  }
  //跳转到地址页面
  address(){
    const {dispatch,location}=this.props;
    if(location.search!==""){
      location.search=location.search.replace("?","")
      const parsed = queryString.parse(location.search);
      dispatch(routerRedux.push('/address?id='+parsed.id));
    }
  }
  //微信支付
  async paywechat(){
    const {location,dispatch}=this.props;
    if(this.state.flag===0){
      Toast.offline("请添加地址",2)
    }else{
      if(location.search!==""){
        location.search=location.search.replace("?","")
        const parsed = queryString.parse(location.search);
        let orderid=parsed.id;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i)!="micromessenger"&&typeof WeixinJSBridge == "undefined"){
          var result = await Goods.H5pay({or_id:orderid});
          if(result.code == 1){
            window.location = result.data;
          }else{
            Toast.fail(result.msg, 2);
          }
        }else{
          const value =await Goods.Payorder({or_id:orderid});
          Toast.loading("正在发起微信支付",2);
          if(value.code===1){
            this.setState({
              wxConfig:JSON.parse(value.data)
            })
            this.onBridgeReady(orderid);
          }else{
            Toast.offline(value.msg,2)
          }
        }
      }
    }
  }
  //支付
  onBridgeReady=()=>{
    const{dispatch}=this.props;
    const {wxConfig}=this.state;
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId":wxConfig.appId,     //公众号名称，由商户传入
            "timeStamp":wxConfig.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":wxConfig.nonceStr, //随机串
            "package":wxConfig.package,
            "signType":wxConfig.signType,         //微信签名方式：
            "paySign":wxConfig.paySign //微信签名
        },
        function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                Toast.success("支付成功,3秒后跳转!",3,()=>{
                  dispatch(routerRedux.push("/order"))
                })
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              Toast.fail("您取消了支付", 2);
            }else{
              Toast.fail("支付失败", 2);
            }
        }
    );
  }
  //消费币支付
  async Paymoney(){
    const {location,dispatch}=this.props;
    if(this.state.flag===0){
      Toast.offline("请添加地址",2)
    }else{
      if(location.search!==""){
        location.search=location.search.replace("?","")
        const parsed = queryString.parse(location.search);
        let orderid=parsed.id;
        const value =await Goods.Paysale({or_id:orderid});
        Toast.loading("正在发起支付",2);
        if(value.code===1){
          this.setState({
            modal3: false,
          })
            Toast.success("支付成功,3秒后跳转!",3,await function(){
              dispatch(routerRedux.push("/order"))
            })
        }else{
          Toast.fail(value.msg, 2);
        }
      }
    }
  }
  //支付宝支付
  async alipay(){
    const {location,dispatch}=this.props;
    if(location.search!==""){
      location.search=location.search.replace("?","")
      const parsed = queryString.parse(location.search);
      let orderid=parsed.id;
      var result = await Goods.aliPay({or_id:orderid});
      if(result.code == 1){
        window.location = result.data;
      }else{
        Toast.fail(result.msg, 2);
      }
    }
  }
  //支付
  pay(){
    if(this.state.flag===0){
      Toast.offline("请添加地址",2)
    }else{
      if(this.state.srcflag===1){
        this.Paymoney()
      }else if(this.state.srcflag===2){
        this.paywechat()
      }else if(this.state.srcflag===3){
        this.alipay()
      }else{
        return;
      }
    }
  }
  render(){
    const {goods}=this.props;
    const data=goods.shopSecList;
    const fire=goods.Recommendlist;
    const {history}=this.props;
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "支付订单",
      lbgimg:'url(' + left + ')',
      rbgimg:'url(' + right + ')',
      titcolor:'#fff'
   }
    return (
      <div className={styles.App}>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ ()=>history.push('/shopcar') }/>
        <div className={styles.main}>
          <div className={styles.addressbox} >
            <div className={styles.add} style={{display:this.state.flag===0?'block':'none'}} onClick={()=>this.address()}>+添加地址</div>
              {
                data?data.map((data,index)=>{
                    if(index>0){
                      return
                    }
                    return(
                        <div onClick={()=>this.this.selsetitem()} style={{display:this.state.flag===1?'flex':'none'}} className={styles.address} onClick={()=>this.address()} key={index}>
                          <img src={icon03} alt=""/>
                          <div className={styles.content}>
                            <div className={styles.top}>
                              <span>收货人&nbsp;&nbsp;&nbsp;&nbsp;{data.addr_receiver}</span><span>{data.addr_tel}</span>
                            </div>
                            <p className="text_hidden2">{data.addr_addr+data.addr_detail}</p>
                          </div>
                        </div>
                    )
                  }
                ):""
              }
          </div>
          {
            data?data.map((shop,index)=>(
              <Payorder key={index} data={shop} index={index} />
            )):""
          }
          <div className={styles.express}>
            <span style={{color:'#070707'}}>配送方式</span>
            <span>商家自配送</span>
          </div>
          <div className={styles.paytype}>
              <span>支付方式</span>
              <div className={styles.selectpay}>
                <div className={styles.money} onClick={()=>this.setState({srcflag:1})}>
                <img src={this.state.srcflag===1?icon02:icon01} alt=""/>
                  <span>红包</span>
                </div>
                <div className={styles.wechat} onClick={()=>this.setState({srcflag:2})}>
                <img src={this.state.srcflag===2?icon02:icon01} alt=""/>
                  <span>微信</span>
                </div>
                <div className={styles.alipay} onClick={()=>this.setState({srcflag:3})}>
                <img src={this.state.srcflag===3?icon02:icon01} alt=""/>
                  <span>支付宝</span>
                </div>
              </div>
          </div>
          <div className={styles.box}>
            <h2>热门推荐</h2>
            <div className={styles.flex}>
              {
              fire.length>0?fire.map((shop)=>
                <div className={styles.flexItem} key={shop.id} onClick={()=>this.shopClick(shop.id)}>
                  <div className={styles.itemimg}>
                    <img src={APIHost+shop.pd_pic[0]} alt=""/>
                  </div>
                  <div className={styles.iteminfo}>
                    <p>{shop.pd_name}</p>
                    <p>
                      <span>￥{shop.pd_price}</span>
                      <span>{shop.pd_sales}已付款</span>
                    </p>
                  </div>
                </div>):""
              }
            </div>
          </div>
        </div>
        <div className={styles.menus}>
          <div className={styles.con}>
            支付金额：
            <span>￥{data[0]?data[0].all_money:""}</span>
          </div>
          <div className={styles.pay}
          onClick={()=>this.pay()}
          >支付</div>
        </div>
      </div>
    )

  }
}





