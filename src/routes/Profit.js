import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from "../utils/fetch";
import { Tabs} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Profit.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Profit extends Component {
  state={
    val:0
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
  render(){
    const {user,history}=this.props;
    const list=user.profitList;
    const info=user.userprofit;
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "我的收益",
      lbgimg:'url(' + left + ')',
      titcolor:'#fff'
   }
   const tabs = [
    { title: '收益详情' },
    { title: '收益记录' },
  ];
    return (
      <div className={styles.App}>
        <style>{`
          .am-tabs-default-bar-tab{
            height:.9rem;
          }
          html:not([data-scale]) .am-tabs-default-bar-top .am-tabs-default-bar-tab::after{
            content:"";
            height:0;
          }
          .am-tabs{
            height:.9rem;
          }
        `}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <Tabs tabs={tabs} onTabClick={(tab,index)=>this.setState({val:index})}></Tabs>
        <div style={{display:this.state.val===0?'block':'none'}} className={styles.info}>
          <p>代理商姓名：{info.us_nickname}</p>
          <p>已结算收益：<span>￥{info.us_shop_bi}元</span></p>
          <p className={styles.profit}>结算周期：即时结算</p>
        </div>
        <div style={{display:this.state.val===1?'block':'none'}} className={styles.list}>
          <div className={styles.menu}>
            <div>收益金额</div>
            <div>收益时间</div>
            <div>收益类型</div>
          </div>
          <div className={styles.content}>
            {
              list.map((item)=>(
                <div className={styles.coninfo} key={item.id}>
                  <div>{item.wa_num}</div>
                  <div>{item.add_time}</div>
                  <div>{item.wa_note}</div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles.menus} style={{display:this.state.val===0?'block':'none'}} onClick={()=>history.push('/putforward')}>申请提现</div>
      </div>
    )

  }
}





