import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn} from "../utils/fetch";
import {Tabs,Toast,Modal,Icon} from 'antd-mobile';
import styles from './style/Order.less';
import Title from '../components/Title';
import MyTabBar from "../components/TabBar";
import news from '../assets/icon-img/news.png';
import nullimg from '../assets/icon-img/null.png';
import clear from '../assets/icon-img/clear03.png';
var queryString = require('querystring');
@connect(state => ({
  user: state.user
}))
export default class Order extends Component {
  state={
    selectedTabBar: 'order',
    tab:"",
    modal1: false,
    modal2:false,
    modal3:false,
    orderid:"",
    hasMore:true,
    textcon:"正在加载，请稍后。。。",
    hide:0,
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
      }
  }
  componentDidMount(){
    this.refs.scroll.addEventListener("scroll",()=>this.scrollbox())
  }
  scrollbox(){
    const clientHeight = this.refs.scroll.clientHeight;
    const scrollTop = this.refs.scroll.scrollTop;
    const scrollHeight = this.refs.scroll.scrollHeight;
    if(clientHeight+scrollTop==scrollHeight){
      if(this.state.hasMore){
        this.onLoadmore()
      }else{
        return;
      }
    }
  }
  componentWillReceiveProps(props){
    const {user}=props;
    if(!user.loadMore){
      this.setState({
        hasMore:false,
        hide:0,
        textcon:"没有更多"
      })
    }else{
      this.setState({
        hide:1,
        hasMore:true
      })
    }
  }
  //加载更多
  onLoadmore(){
    const { user,dispatch} = this.props;
    let val=this.state.tab!==""?this.state.tab:"";
    dispatch({
      type: 'user/order',
      payload: {page:user.pagination.page+1,or_status:val}
    });
  }
  //获取订单信息
  async shopinfo(val){
    const {dispatch} = this.props;
    let id=val;
    const value =await User.ShopInfo({or_shop_id:id})
    if(value.code===1){
      dispatch({
        type: 'user/shopIn',
        payload: {
          shopInfo:value.data
        }
      });
      this.setState({
        modal1: true,
      });
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  //确认收货
  sure(val){
    this.setState({
      modal2: true,
    });
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
  //弹出收货窗口
  alertsure(val){
    this.setState({
      modal2: true,
      orderid:val
    });
  }
  //确认收货
  async sureshop(){
    const {dispatch} = this.props;
    let id=this.state.orderid;
    const value =await User.SureInfo({or_id:id})
    if(value.code===1){
      this.setState({
        modal2:false,
      });
      dispatch(routerRedux.push('/order'));
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  //支付
  async pay(addr,val){
    const {dispatch}=this.props;
    if(addr===0){
      Toast.fail("您没有添加地址，3秒后跳转",3,await function(){
        dispatch(routerRedux.push("/shoppay?id="+val))
      })
    }else{
      this.setState({
          modal3: true,
          orderid:val
        })
    }
  }
  //支付前
  async payOrder(){
    const {dispatch}=this.props;
    let val=this.state.orderid;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)!="micromessenger"&&typeof WeixinJSBridge =="undefined"){
      var result = await User.H5pay({or_id:val});
      if(result.code == 1){
        window.location = result.data;
      }else{
        Toast.fail(result.msg, 2);
      }
    }else{
      const value =await User.Payorder({or_id:val});
      Toast.loading("正在发起微信支付",2);
      if(value.code===1){
        this.setState({
          wxConfig:JSON.parse(value.data),
          modal3: false,
        })
        this.onBridgeReady();
      }else{
        Toast.fail(value.msg,2);
      }
    }
  }
  //微信支付
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
    const {dispatch}=this.props;
    let val=this.state.orderid;
    Toast.loading("正在发起消费币支付",2);
    const value =await User.Paysale({or_id:val});
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
  //支付宝支付
  async alipayOrder(){
    const {dispatch}=this.props;
    let val=this.state.orderid;
    var result = await User.aliPay({or_id:val});
    if(result.code == 1){
      window.location = result.data;
    }else{
      Toast.fail(result.msg, 2);
    }
  }
  //点击切换订单
  async tabClick(el){
    const {dispatch}=this.props;
    this.setState({
      tab:el.id
    })
    Toast.loading("加载中...");
    const value =await User.Orderlist({or_status:el.id});
    if(value.code===1){
      dispatch({
        type: 'user/ordersave',
        payload: {
          Orderlist:value.data.data,
          pagination: {
            page: 1,
            total: value.data.total
          }
        }
      });
      Toast.hide();
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  //取消订单
  async cancelOrder(val,num){
    const {dispatch}=this.props;
    const data = await User.cancel({or_id:val});
    if(data.code===1){
      Toast.success(data.msg,1)
      dispatch({
        type: 'user/cancelOrder',
        payload:{
          index:num
        }
      });
    }else{
      Toast.fail(data.msg, 2);
    }
  }
  render(){
    const {user}=this.props;
    const data=user.Orderlist;
    const userinfo=user.shopInfo;
    // 顶部title参数
    const Titles = {
      righticon: 1,
      bgc: "#ffe12d",
      tit: "订单",
      rbgimg:'url(' + news + ')'
    }
    const tabs = [
      { title: '全部', id:""},
      { title: '待支付', id:0},
      { title: '待发货', id:1},
      { title: '待收货', id:2},
      { title: '已取消', id:4},
    ];
    // 传入tabBar参数
    const {history} = this.props;
    const tabBarProps = {
      selectedTabBar: this.state.selectedTabBar,
      history
    }
    const bgimg={
      backgroundImage:'url(' + nullimg + ')'
    }

    return (
      <div className={styles.App}>
        <style>{`
            .am-tabs-default-bar-tab{
              height:.9rem;
            }
            .am-tabs{
              height:.9rem;
            }
            html:not([data-scale]) .am-tabs-default-bar-top .am-tabs-default-bar-tab::after{
              content:"";
              height:0;
            }

            .am-modal-transparent{
              width:90%;
              max-height:8rem;
            }
            .am-modal-content,.am-modal-body,.am-modal-transparent{
              overflow:visible;
              padding:0;
            }
            .am-modal-transparent .am-modal-content,.am-modal-transparent .am-modal-content .am-modal-body{
              padding:0;
            }
            .am-modal-close{
              top:.15rem;
            }
            .am-modal-header{
              padding:.5rem .2rem;
            }
            .text_hidden2{
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp:2;
              -webkit-box-orient: vertical;
            }
        `}</style>
        { /* 顶部title */ }
        <Title {...Titles}/>
        <Tabs tabs={tabs}
            initialPage={0}
            swipeable={false}
            onChange={(tab, index) =>{}}
            onTabClick = {(tab, index) =>this.tabClick(tab, index)}
            distanceToChangeTab={1}
            tabBarTextStyle = {{fontSize: ".3rem",color: "#070707"}}
            tabBarActiveTextColor = '#20a3ff'
            tabBarUnderlineStyle = {{border: ".02rem solid #20a3ff",backgroundColor: "#20a3ff"}}
            >
        </Tabs>
        <div className={styles.main} ref="scroll">
          {
            data.map((order,index)=>(
              <div className={styles.box} key={order.id} style={{borderColor:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}>
                  <div className={styles.tit} style={{borderColor:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}>
                      <div style={{color:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}>订单号：{order.or_num}</div>
                      <div style={{color:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}>￥{order.total_money}</div>
                  </div>
                  {
                    order.detail.map((list)=>(
                        <div className={styles.content} key={list.id} >
                        <div className={styles.imgbox} onClick={()=>this.shopClick(list.pd_id)}>
                          <img src={APIHost+list.or_pd_pic[0]} alt=""/>
                        </div>
                        <div className={styles.con} onClick={()=>this.shopinfo(list.id)}>
                          <p style={{color:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}>
                            <span>{list.or_pd_name}</span>
                            <span>x{list.or_pd_num}</span>
                          </p>
                          <p className='text_hidden2'>{list.or_pd_content}</p>
                        </div>
                      </div>
                    ))
                  }
                  <div className={styles.menus}>
                    <div className={styles.menu} style={{backgroundColor:order.or_status===0?'#e733f7':(order.or_status===1?'#05aafa':(order.or_status===2?'#fa2573':(order.or_status===3?'#bfbfbf':'#bfbfbf')))}}
                    onClick={order.or_status===2?()=>this.alertsure(order.id):(order.or_status===0?()=>this.pay(order.addr_id,order.id):()=>{})}>{order.or_status===0?'待付款':(order.or_status===1?'待发货':(order.or_status===2?'待收货':(order.or_status===3?'已收货':"已取消")))}</div>
                    <div className={styles.menu} style={{backgroundColor:'#bfbfbf',display:order.or_status!==0?"none":"block"}} onClick={()=>this.cancelOrder(order.id,index)}>取消订单</div>
                  </div>
              </div>
            ))
          }
          <div className={styles.load} style={{display:data.length!==0?'flex':'none'}}>
            <Icon type="loading" style={{display:this.state.hide===0?'none':'block',marginRight:'.5rem'}}/>
            <p>{this.state.textcon}</p>
          </div>
          <div className={styles.nullbox} style={{display:data.length!==0?'none':'block'}}>
            <div className={styles.null} style={bgimg}></div>
            <p className={styles.textcon}>哎呦，还没有订单哦。。。。。。</p>
          </div>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          >
          <div className={styles.box}>
            <img src={clear} alt="" className={styles.clearbtn} onClick={this.onClose('modal1')}/>
            <p style={{backgroundColor:'#f7df3f',height:'.9rem',textAlign:'center',lineHeight:'.9rem',fontSize:'.3rem',color:'#fff'}}>订单信息</p>
            <div style={{padding:'.2rem .3rem'}} className={styles.cont} >
              <p><span>物品名称</span><span>{userinfo?userinfo.or_pd_name:""}</span></p>
              <p><span>数量</span><span>{userinfo?userinfo.or_pd_num:""}</span></p>
              <p><span>价格</span><span>{userinfo?userinfo.or_pd_price:""}</span></p>
              <p><span>联系电话</span><span>{userinfo?userinfo.addr_tel:""}</span></p>
              <p><span>物流公司</span><span>{userinfo?userinfo.or_express:""}</span></p>
              <p><span>物流单号</span><span>{userinfo?userinfo.or_express_num:""}</span></p>
              <p><span>地址</span><span>{userinfo?userinfo.addr_addr:""}</span></p>
            </div>
          </div>
        </Modal>
        <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal2')}
          title="确认收货吗？"
          footer={[{ text: '取消', onPress: () => {this.onClose('modal2')(); } },{ text: '确认', onPress: () =>this.sureshop()}]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
        </Modal>
        <Modal
          visible={this.state.modal3}
          transparent
          onClose={this.onClose('modal3')}
          maskClosable={true}
          closable={true}
          title="请选择支付方式"
          footer={[
            { text: '红包',onPress:()=>this.Paymoney() },
            { text: '微信', onPress:()=>this.payOrder() },
            { text: '支付宝', onPress:()=>this.alipayOrder() }
          ]}
        >
        </Modal>
        { /* 底部导航 */ }
        <MyTabBar { ...tabBarProps}/>
      </div>
    );
  }
}
