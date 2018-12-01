import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Icon} from 'antd-mobile';
import {loggedIn,APIHost} from "../utils/fetch";
import MyTabBar from "../components/TabBar";
import Title from '../components/Title';
import styles from './style/Rash.less';
import nullimg from '../assets/icon-img/null.png';
@connect(state => ({
  user: state.user
}))
export default class Rash extends Component {
  state = {
    selectedTabBar: 'rash',
    hide:0,
    hasMore:false,
    textcon:"没有更多"
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push({pathname: '/login'}));
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
    if(!user.Load){
      this.setState({
        hasMore:false,
        hide:0,
        textcon:"没有更多"
      })
    }else{
      this.setState({
        hide:1,
        hasMore:true,
        textcon:"正在加载，请稍后。。。"
      })
    }
  }
  //加载更多
  onLoadmore(){
    const { user,dispatch} = this.props;
    dispatch({
      type: 'user/userRash',
      payload: {page:user.pageinfo.page+1}
    });
  }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/rashshop?id='+val));
    }
  }
  render(){
    const {user,history}=this.props;
    const List=user.rashList;
    // 顶部title参数
    const Titles = {
      tit: "代理抢购",
    }
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
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main} ref="scroll">
          <div className={styles.flex}>
            {
              List.length>0?List.map((shop) =>
              <div className = {styles.flexItem} key = {shop.id} onClick={()=>this.shopClick(shop.id)}>
                <div className = {styles.itemimg} style={{background:`url(${APIHost+shop.pd_pic[0]}) center no-repeat`,backgroundSize:'contain'}}> </div>
                <div className = {styles.iteminfo} >
                  <p> {shop.pd_name} </p>
                  <p >
                    <span> ￥{shop.pd_agency_price} </span>
                    <span> {shop.pd_sales}已付款 </span>
                  </p>
                </div>
              </div>):""
            }
          </div>
          <div className={styles.load} style={{display:List.length!==0?'flex':'none'}}>
              <Icon type="loading" style={{display:this.state.hide===0?'none':'block',marginRight:'.5rem'}}/>
              <p>{this.state.textcon}</p>
            </div>
          <div className={styles.nullbox} style={{display:List.length!==0?'none':'block'}}>
            <div className={styles.null} style={bgimg}></div>
            <p className={styles.textcon}>哎呦，还没有商品哦。。。。。。</p>
          </div>
        </div>
        { /* 底部导航 */ }
        <MyTabBar { ...tabBarProps}/>
      </div>
    )

  }
}





