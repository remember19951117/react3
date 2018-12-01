import React,{Component} from 'react';
import * as Goods from "../services/goods";
import {connect} from 'dva';
import {loggedIn,APIHost} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import styles from './style/Shopinfo.less';
import Title from '../components/Title';
import {Carousel,Modal,Toast} from 'antd-mobile';
import news from '../assets/icon-img/news.png';
import left from '../assets/icon-img/return.png';
import shopcar from '../assets/icon-img/shopcars.png';
import add from '../assets/icon-img/add.png';
import reduce from '../assets/icon-img/reduce.png';
@connect(state => ({
  home: state.home
}))
export default class Shopinfo extends Component {
  state = {
    shopimg:[],
    modal1: false,
    num:1,
  }
  // componentWillMount(){
  //   const { dispatch } = this.props;
  //   const user = loggedIn();
  //   if(!user){
  //       dispatch(routerRedux.push({pathname: '/login'}));
  //   }
  // }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(routerRedux.push({pathname: '/'}));
  }
  componentWillReceiveProps(nextProps){
    const { home } = nextProps;
    const data=home.shopdetails;
    const banner=this.state.shopimg;
    if(data.id){
      data.pd_pic.map((item)=>(
        banner.push({
          src:APIHost+item,
        })
      ))
      this.setState({
        shopimg:banner
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
  //商品数量增加
  adds(){
    const { home } = this.props;
    const max=home.shopdetails.pd_inventory;
    if(this.state.num<max){
      this.setState({
        num:this.state.num+1
      })
    }else{
      Toast.fail("数量不能超出库存", 2);
    }
  }
  //商品数量减少
  reduce(){
    if(this.state.num>=2){
      this.setState({
        num:this.state.num-1
      })
    }else{
      Toast.fail("最小数量为1", 2);
    }
  }
  //订单生成
  async shopOrder(){
    const { dispatch,location } = this.props;
    const queryString = require('query-string');
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
    }else{
      if(location.search!==""){
        location.search=location.search.replace("?","")
        const parsed = queryString.parse(location.search);
        dispatch(routerRedux.push('/address?id='+parsed.id+'&num='+this.state.num));
      }
    }
  }
  //加入购物车
  async addshopCar(val){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push('/login'));
    }else{
      const datas =await Goods.addShop({pd_id:val});
      if(datas.code===1){
        Toast.success(datas.msg,2,await function(){})
      }else{
        Toast.offline("添加失败",2);
      }
    }
  }

  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/shopinfo?id='+val));
    }
  }
  render(){
    const { home } = this.props;
    const data=home.shopdetails;
    const fire=home.Recommendlist;
    let value=data.pd_detail?data.pd_detail:"";
    let html=value.replace(/\/ueditor/g,APIHost+'/ueditor' );
    const {shopimg}=this.state;
    // 顶部title参数
    const Titles = {
      tit: "物品详情",
      rbgimg:'url(' + news + ')',
      lbgimg:'url(' + left + ')'
    }
    //左箭头
    const leftitem={
      backgroundImage: 'url(' + reduce + ')'
    }
    //右箭头
    const rightitem={
      backgroundImage: 'url(' + add + ')'
    }
    return (
      <div className={styles.App}>
          <style>{`
            .text_hidden3{
              -webkit-line-clamp:3;
              line-height:.35rem;
            }
            .text_hidden2{
              -webkit-line-clamp:3;
              line-height:.4rem;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              font-size:.25rem;
            }
            .slider-list{
              height:100vw !important;
            }

            .slider-list li{
              height:100vw !important;
            }
            .slider-list div{
              position:relitive;
            }
            .slider-list div img{
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                width:100%;
                height:100%;
                border:0 none;
            }
            .am-list-item{
              padding:0;
            }
            .am-list-item.am-list-item-middle .am-list-line{
              height:1rem;
            }
            .am-list-item .am-list-line .am-list-extra{
              flex-basis:70%;
              height:.7rem;
              border-radius:.1rem;
              border: solid .02rem #cacaca;
              font-size:.3rem;
              text-align:center;
            }
            .am-list-item .am-list-line .am-list-arrow{
              margin-left:-.6rem;
              width:20px;
              height:20px;
            }
            .am-list-item .am-list-line .am-list-content{
              width:2rem;
              font-size:.3rem;
              color:#070707;
              text-align:right;
              padding-right:.4rem;
              flex:none;
            }
          `}</style>
          { /* 顶部title */ }
          <Title {...Titles} leftFunc={ this.returnGoBack }/>
          <div className={styles.main}>
            <div className={styles.shopbox}>
              <Carousel
                  autoplay={false}
                  infinite
                  dots={false}
                  >
                  {
                    shopimg.map(function(item, index){
                      return(
                        <div key={index} style={{ display: 'inline-block', width: '100%',height: 'auto' }}>
                          <img
                            src={item.src}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: 'auto'  }}
                            onLoad={() => {}}
                          />
                        </div>
                      )
                    })
                  }
                </Carousel>
            </div>
            <div className={styles.content}>
              <h2>{data.pd_name}</h2>
              <p className="text_hidden2">{data.pd_content}</p>
              <div className={styles.price}>
                <p>
                  <span style={{color:'#cccccc',marginRight:'.3rem'}}>价格：</span>
                  <span style={{color:'#ff6d00'}}>￥{data.pd_price}</span>
                </p>
              </div >
              <div className={styles.modalstore}>
                <span>已售{data.pd_sales}</span>|<span>库存{data.pd_inventory}</span>
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
            <div className={styles.shop}>
                <h2>商品详情</h2>
                <div dangerouslySetInnerHTML={{__html:html}} className={styles.shopinfo}></div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div onClick={()=>this.addshopCar(data.id)}>
              <img src={shopcar} alt=""/>
              <span >放入购物车</span>
            </div>
            <div className={styles.menu} onClick={this.showModal('modal1')}>购买</div>
          </div>
          <Modal
              popup
              visible={this.state.modal1}
              onClose={this.onClose('modal1')}
              animationType="slide-up"
            >
            <div>
              <div className={styles.modalcontent}>
                <img src={shopimg[0]?shopimg[0].src:""} alt=""/>
                <div className={styles.coninfo}>
                  <h2>{data.ca_name}</h2>
                  <p className="text_hidden2">{data.pd_content}</p>
                  <div className={styles.modalprice}>
                      <span style={{color:'#cccccc',marginRight:'.3rem'}}>价格：</span>
                      <span style={{color:'#ff6d00'}}>￥{data.pd_price}</span>
                  </div>
                </div>
              </div>
              <div className={styles.modalmenus}>
                <div className={styles.itemnum}>
                    <span style={{fontSize:'.25rem',color:'#070707',textAlign:'left',width:'25%'}}>数量</span>
                    <div className={styles.stepper}>
                      <span onClick={()=>this.reduce()} style={leftitem}></span>
                      <span>{this.state.num}</span>
                      <span onClick={()=>this.adds()} style={rightitem}></span>
                    </div>
                    <span style={{width:'25%'}}></span>
                </div>
              </div>
              <div className={styles.enter} onClick={this.state.num>0?()=>this.shopOrder():this.onClose('modal1')}>购&nbsp;买</div>
            </div>
          </Modal>
      </div>
    )
  }
}

