import React,{Component} from 'react';
import * as Home from "../services/home";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn} from "../utils/fetch";
import { Menu, NavBar ,Toast} from 'antd-mobile';
import ReactPullLoad,{ STATS } from 'react-pullload';
import '../../node_modules/react-pullload/dist/ReactPullLoad.css'
import styles from './style/Leveltwo.less';
import left from '../assets/icon-img/return.png';
import nullimg from '../assets/icon-img/null.png';
const datasec = [
  {
    value: 1,
    label: '热销',
  }, {
    value: 2,
    label: '新品',
  },
  {
    value: 3,
    label: '价格升序',
  },
  {
    value: 4,
    label: '价格降序',
    isLeaf: true,
  },
];
@connect(state => ({
  home: state.home
}))
export default class Leveltwo extends Component {
  state = {
    title:"商品",
    initData: '',
    show: false,
    value:1,
    shopList:[],
    hasMore:false,
    action: STATS.init,
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
        dispatch(routerRedux.push({pathname: '/login'}));
    }
  }
  componentWillReceiveProps(nextProps){
    const { home} = nextProps;
    const shoplist=home.shopList;
    const tit=home.Title;
    if(shoplist){
      this.setState({
        shopList:shoplist,
      })
    }
    if(tit){
      this.setState({
        title:tit,
      })
    }
    this.setState({
      hasMore:home.loadMore
    })
  }
  componentDidMount(){
    const { home} = this.props;
    const tit=home.Title;
    const shoplist=home.shopList;
    if(shoplist){
      this.setState({
        shopList:shoplist,
      })
    }
    this.setState({
      hasMore:home.loadMore
    })
    if(tit){
      this.setState({
        title:tit,
      })
    }
  }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  onChange = (value) => {
    datasec.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        this.setState({
          value:dataItem.value
        })
       this.sort(dataItem.value)
      }
    });
    this.setState({
      show: !this.state.show,
    });
  }
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for/ async data loading
    if (!this.state.initData) {
        this.setState({
          initData: datasec,
        });
    }
  }
    handleAction = (action) => {
    console.info(action, this.state.action,action === this.state.action);
    //new action must do not equel to old action
    if(action === this.state.action){
      return false
    }

    if(action === STATS.refreshing){
      // this.handRefreshing();
    } else if(action === STATS.loading){
      this.handLoadMore();
    } else{
      //DO NOT modify below code
      this.setState({
        action: action
      })
    }
  }
  handLoadMore = () => {
    if(STATS.loading === this.state.action){
      return false
    }
    //无更多内容则不执行后面逻辑
    if(!this.state.hasMore){
      return;
    }
    setTimeout(()=>{
      if(!this.state.hasMore){
        this.setState({
          action: STATS.reset,
          hasMore: false
        });
      } else{
        this.setState({
          action: STATS.reset,
        });
      }
    }, 3000)
    this.onLoadmore()
    this.setState({
      action: STATS.loading
    })
  }
  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/shopinfo?id='+val));
    }
  }
  //加载更多
  onLoadmore(){
    const { home,dispatch,location} = this.props;
    let val=this.state.value;
    const queryString = require('query-string');
    location.search=location.search.replace("?","")
    const parsed = queryString.parse(location.search);
    if(parsed.ca_id){
        dispatch({
          type: 'home/searchshop',
          payload: {page:home.pagination.page+1,ca_id:parsed.ca_id,orderby:val}
        });
    }else if(parsed.pd_name){
        dispatch({
          type: 'home/searchshop',
          payload: {page:home.pagination.page+1,ca_id:parsed.pd_name,orderby:val}
        });
    }
  }
  //排序
  async sort(val){
    const {dispatch,location} = this.props;
    const queryString = require('query-string');
    location.search=location.search.replace("?","")
    const parsed = queryString.parse(location.search);
    if(parsed.pd_name){
      Toast.loading("正在获取信息", 0);
      const value =await Home.searchShop({orderby:val,pd_name:parsed.pd_name})
      Toast.hide();
      if(value.code===1){
        dispatch({
          type: 'home/queryMyRenewListSuccess',
          payload: {
            shopList:value.data.list.data,
            pagination: {
              page:1,
              pageSize: 10,
              total: value.data.list.total
            }
          }
        });
      }else{
          Toast.fail(value.msg, 2);
      }
    }else if(parsed.ca_id){
      Toast.loading("正在获取信息", 0);
      const value =await Home.searchShop({orderby:val,ca_id:parsed.ca_id});
      Toast.hide();
      if(value.code===1){
        dispatch({
          type: 'home/queryMyRenewListSuccess',
          payload: {
            shopList:value.data.list.data,
            pagination: {
              page:1,
              pageSize: 10,
              total: value.data.list.total
            }
          }
        });
      }else{
          Toast.fail(value.msg, 2);
      }
    }
  }
  render(){
    const { initData, show } = this.state;
    const menuEl = (
      <Menu
        className="single-foo-menu"
        data={initData}
        value={[this.state.value]}
        level={1}
        onChange={this.onChange}
        height='1.2rem'
      />
    );
    const bgimg={
      backgroundImage:'url(' + nullimg + ')'
    }
    const {hasMore}=this.state;
    const _this=this;
    return (
      <div className={styles.App}>
          <style>{`
            .am-navbar{
              height:.8rem;
            }
            .am-navbar-light{
              color:#070707;
            }
            .am-navbar-light .am-navbar-title{
              color:#070707;
              font-size:.3rem;
            }
            .am-list-item{
              min-height:.8rem;
            }
            .am-list .am-list-item.am-radio-item .am-list-line .am-list-extra .am-radio-inner{
              top:50%;
              transform:translateY(-50%);
              right:.3rem;
            }
            .am-navbar-left{
              font-size:.3rem;
              padding:0;
            }
            .am-menu .am-flexbox .am-flexbox-item:last-child .am-list .am-list-item.am-sub-menu-item-selected .am-list-line .am-list-content{
              color:#20a3ff;
            }
            .am-menu .am-flexbox .am-flexbox-item .am-list .am-list-item .am-list-line .am-list-content{
              font-size:.3rem;
            }
            .am-radio.am-radio-checked .am-radio-inner:after{
              border-color:#20a3ff;
            }
            .btn{
              border:.01rem solid #cacaca;
              border-radius:.15rem;
              background-color:#fff;
            }
            .pull-load{
              padding-top:1.74rem;
              background-color:#f2f3ec;
            }
          `}</style>
          { /* 顶部title */ }
          <div className={styles.box}>
            <div style={{background:`url(${left}) center no-repeat`,backgroundSize:'contain'}} onClick={()=>this.returnGoBack()}></div>
            <h2 style={{color:'#fff'}}>{this.state.title}</h2>
            <div></div>
          </div>
          <div className={styles.sort}>
            <div className={show ? 'single-menu-active' : ''}>
                <NavBar
                  mode="light"
                  onLeftClick={this.handleClick}
                  className="single-top-nav-bar btn"
                  >
                  <div onClick={this.handleClick}>{_this.state.value===1?"热销":(_this.state.value===2?"新品":(_this.state.value===3?"价格升序":"价格降序"))}</div>
                </NavBar>
              {show ? initData ? menuEl : "" : null}
            </div>
          </div>
          <div className={styles.nullbox} style={{display:this.state.shopList.length!==0?'none':'block'}}>
            <div className={styles.null} style={bgimg}></div>
            <p className={styles.textcon}>哎呦，还没有商品哦。。。。。。</p>
          </div>
          <ReactPullLoad
            downEnough={150}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={hasMore}
            style={{display:this.state.shopList.length!==0?'block':'none'}}
            distanceBottom={1000}>
            <div className={styles.flex}>
              {
                this.state.shopList.length>0?this.state.shopList.map((shop) =>
                <div className = {styles.flexItem} key = {shop.id} onClick={()=>this.shopClick(shop.id)}>
                  <div className = {styles.itemimg} style={{background:`url(${APIHost+shop.pd_pic[0]}) center no-repeat`,backgroundSize:'contain'}}> </div>
                  <div className = {styles.iteminfo} >
                    <p> {shop.pd_name} </p>
                    <p >
                      <span> ￥{shop.pd_price} </span>
                      <span> {shop.pd_sales}已付款 </span>
                    </p>
                  </div>
                </div>):""
              }
            </div>
        </ReactPullLoad>
      </div>
    )
  }
}
