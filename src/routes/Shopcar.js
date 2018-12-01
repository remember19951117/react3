import React,{Component} from 'react';
import * as Goods from "../services/goods";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn} from "../utils/fetch";

import {Toast} from 'antd-mobile';
import styles from './style/Shopcar.less';
import Title from '../components/Title';
import MyTabBar from "../components/TabBar";
import Shopcarbar from "../components/shopcarbar";
import news from '../assets/icon-img/news.png';
import icon00 from '../assets/icon-img/no-select.png';
import icon01 from '../assets/icon-img/select.png';
import nullimg from '../assets/icon-img/null.png';
@connect(state => ({
  goods: state.goods
}))
export default class Shopcar extends Component {
  state={
    selectedTabBar: 'cart',
    allselect:0
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push({pathname: '/login'}));
      }
  }
  //删除购物车商品
   dellshop = async (item,index) => {
    const {dispatch} = this.props;
    let id=item.id;
    const data =await Goods.dellShop({key:'cart',id:id})
    if(data.code===1){
      Toast.success(data.msg,1)
      dispatch({
        type: 'goods/dellShop',
        payload:{
          index:index
        }
      });
    }else{
      Toast.fail(data.msg, 2);
    }
  }
  //更新到数据库
  async updateEditStatus(item,index){
    this.setState({editStatus: !this.state.editStatus})
    let num=item.pd_num;
    let id=item.id;
    const datas =await Goods.updateStore({cart_id:id,pd_num:num});
    if(datas.code===1){
      return;
    }else{
      Toast.fail(datas.msg, 2);
    }
  }
  // 更改选中演示
  updateSelectStatus=(item,index)=>{
    const { dispatch,goods } = this.props;
    dispatch({
      type: 'goods/selectShopCarItem',
      payload: {index:index, status:!item.imgStatus}
    })
    let allitem=0;
    const _this=this;
    goods.shopcarList.map(function(item){
      if(item.imgStatus){
        allitem+=1;
      }else if(allitem>0){
        allitem-=1;
      }
      if(allitem===goods.shopcarList.length){
        _this.setState({
          allselect:1
        })
      }else{
        _this.setState({
          allselect:0
        })
      }
    })
  }
  // 全部选中的状态
  exchangeAllSelect(){
    const { dispatch }= this.props;
    dispatch({
        type: 'goods/updateShopCarAllSelectState',
        payload: {status: !this.state.allselect}
    })
    if(this.state.allselect===1){
      this.setState({
        allselect:0
      })
    }else if(this.state.allselect===0){
      this.setState({
        allselect:1
      })
    }
  }
  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/shopinfo?id='+val))
    }
  }
  //商品详情
  shopItem=(item,index)=>{
    const {dispatch}=this.props;
    dispatch(routerRedux.push('/shopinfo?id='+item.pd_id));
  }
  // 加法
  add= (item, key) =>{
    const { dispatch }= this.props;
    if(item.max_num>= item.pd_num+1){
        dispatch({
            type: 'goods/updateShopCarItem',
            payload: {number:1, index:key}
        })
    }else{
        Toast.offline("最大库存为"+item.max_num,1);
        return;
    }
  }
  // 减法
  reduce= (item, key) =>{
    const { dispatch }= this.props;
    if(item.pd_num-1>0){
        dispatch({
            type: 'goods/updateShopCarItem',
            payload: {number:-1, index:key}
        })
    }else{
        Toast.offline("购买数量最低为1",1);
        return;
    }
  }

  // 结算购物车
  async settlementShopCarFunc(){
    const {goods, dispatch}=this.props;
    var arr = [];
    goods.shopcarList.map(function(item){
        if(item.imgStatus){
            arr.push(item.id)
        }
    });
    if(arr.length<1){
        Toast.offline("请先选择要购买的商品",1);
        return
    }else{
      const datas =await Goods.submitState({arr:arr});
      if(datas.code===1){
        dispatch(routerRedux.push('/shoppay?id='+datas.data));
      }else{
        Toast.fail(datas.msg, 2);
      }
    }
  }

  render(){
    const {goods}=this.props;
    const data=goods.shopcarList;
    // const fire=goods.Recommendlist;
    var money = 0;
    data.map(function(item){
      if(item.imgStatus){
          money+=Math.round(parseFloat(item.pd_num*item.pd_price*100))/100; 
      }
    })

    // 顶部title参数
    const Titles = {
      tit: "购物车",
      rbgimg:'url(' + news + ')'
    }

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

        `}</style>
        { /* 顶部title */ }
        <Title {...Titles}/>
        <div className={styles.main}>
          {
            data.map((shop,index)=>(
              <Shopcarbar key={index} data={shop} index={index} editStatus={true} editGoods={this.editGoodsFunc} updateImgStatus={this.updateSelectStatus} dell={this.dellshop} add={this.add} reduce={this.reduce} updateEditStatus={this.updateEditStatus} shopInfo={this.shopItem}/>
            ))
          }
          <div className={styles.nullbox} style={{display:data.length!==0?'none':'block'}}>
            <div className={styles.null} style={bgimg}></div>
            <p className={styles.textcon}>哎呦，还没有商品哦。。。。。。</p>
          </div>
          {/* <div className={styles.box}>
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
          </div> */}
        </div>
          <div className={styles.settlement}>
              <div className={styles.allselect} onClick={()=>this.exchangeAllSelect()}>
                <div className={styles.select}>
                  <img src={this.state.allselect===1?icon01:icon00} alt=""/>
                </div>
                <span>全选</span>
              </div>
              <div style={{fontSize:'.35rem',color:'#ff6d00'}}>结算金额：￥{money}</div>
              <div className={styles.btn} onClick={()=>this.settlementShopCarFunc()}>结算</div>
          </div>
        { /* 底部导航 */ }
        <MyTabBar { ...tabBarProps}/>
      </div>
    );
  }
}
