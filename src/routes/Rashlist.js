import React,{Component} from 'react';
import {connect} from 'dva';
import * as User from "../services/user";
import { routerRedux} from 'dva/router';
import {loggedIn} from "../utils/fetch";
import {Toast,Tabs} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Rashlist.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Rashlist extends Component {
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
    const value =await User.rashRecord({status:el.id});
    if(value.code===1){
      dispatch({
        type: 'user/Recordlist',
        payload: {
          rashRecord:value.data
        }
      });
      Toast.hide();
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  render(){
    const {user}=this.props;
    const data=user.rashRecord;
    const tabs = [
      { title: '全部', id:100},
      { title: '抢购失败', id:3},
      { title: '正在审核', id:1},
      { title: '抢购成功', id:2},
    ];
    // 顶部title参数
    const Titles = {
      tit: "抢购记录",
      lbgimg:'url(' + left + ')',
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
            data.length>0?data.map((list,index)=>(
              <div className={styles.box} key={list.id} style={{borderColor:list.status===1?'#e733f7':(list.status===2?'#05aafa':(list.status===3?'#fa2573':'#bfbfbf')),color:list.status===1?'#e733f7':(list.status===2?'#05aafa':(list.status===3?'#fa2573':'#bfbfbf'))}}>
                  <p style={{color:'#070707',fontSize:'.3rem'}}>代理商品：{list.pd_name}</p>
                  <p>商品种类：{list.ca_name}</p>
                  <p>申请时间：{list.add_time}</p>
                  <p>抢购数量：{list.agency_num}</p>
                  <p>申请结果：{list.status===1?"正在审核":(list.status===2?"抢购成功":(list.status===3?"抢购失败":"未知错误"))}</p>
              </div>
            )):""
          }
        </div>
      </div>
    )

  }
}





