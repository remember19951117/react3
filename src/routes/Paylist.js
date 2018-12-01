import React,{Component} from 'react';
import {connect} from 'dva';
import * as User from "../services/user";
import { routerRedux} from 'dva/router';
import {loggedIn} from "../utils/fetch";
import {Toast,Tabs} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Paylist.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Paylist extends Component {
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
  //点击切换商品列表
  async tabClick(el){
    const {dispatch}=this.props;
    Toast.loading("加载中...");
    const value =await User.Paylist({tx_status:el.id});
    if(value.code===1){
      dispatch({
        type: 'user/paylist',
        payload: {
          Paylist:value.data.data
        }
      });
      Toast.hide();
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  render(){
    const {user}=this.props;
    const data=user.Paylist;
    const tabs = [
      { title: '全部', id:""},
      { title: '提现失败', id:2},
      { title: '正在审核', id:0},
      { title: '提现成功', id:1},
    ];
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "提现记录",
      lbgimg:'url(' + left + ')',
      titcolor:'#fff'
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
        `}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onTabClick = {(tab, index) =>this.tabClick(tab, index)}
          tabBarTextStyle = {{fontSize: ".3rem",color: "#070707"}}
          tabBarActiveTextColor = '#20a3ff'
          tabBarUnderlineStyle = {{border: ".02rem solid #20a3ff",backgroundColor: "#f7df3f"}}
          >
        </Tabs>
        <div className={styles.main}>
          {
            data.map((list,index)=>(
              <div className={styles.box} key={list.id} style={{borderColor:list.tx_status===0?'#e733f7':(list.tx_status===1?'#05aafa':(list.tx_status===2?'#fa2573':(list.tx_status===3?'#bfbfbf':'#42d3d8'))),color:list.tx_status===0?'#e733f7':(list.tx_status===1?'#05aafa':(list.tx_status===2?'#fa2573':(list.tx_status===3?'#bfbfbf':'#42d3d8')))}}>
                  <p><span>提现金额：{list.tx_need}</span><span>提现方式：{list.tx_type===0?"银行卡":(list.tx_type===1?"支付宝":(list.tx_type===2?"微信":""))}</span></p>
                  <p>到账金额：{list.tx_num}</p>
                  <p>提现账号：{list.tx_account}</p>
                  <p>提现时间：{list.tx_apply_time}</p>
                  <p>提现结果：{list.tx_status===0?"正在审核":(list.tx_status===1?"提现成功":(list.tx_status===2?"提现账户信息不符，请核对后重新提交":"未知错误"))}</p>
              </div>
            ))
          }
        </div>
      </div>
    )

  }
}





