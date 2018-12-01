import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Tabs} from 'antd-mobile';
import {loggedIn,APIHost} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/Account.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Account extends Component {
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
    const {user}=this.props;
    const qrlist=user.qrList;
    const aclist=user.accountList;
    const list=user.qrcodeList;
    const tabs = [
        { title: '我的二维码', id:100},
        { title: '我的账户', id:3},
        // { title: '下级扫码', id:3},
      ];
    // 顶部title参数
    const Titles = {
        tit: "账户管理",
        lbgimg:'url(' + left + ')',
     }
    return (
      <div className={styles.App}>
        <style>{`
          .am-tabs-default-bar-tab{
            height:.9rem;
          }
          .am-tabs{
              position:absolute;
              top:.84rem;
              bottom:0;
              width:100%;
              height:auto;
          }
        `}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <Tabs
          tabs={tabs}
          initialPage={0}
        //   onTabClick = {(tab, index) =>this.tabClick(tab, index)}
          tabBarTextStyle = {{fontSize: ".3rem",color: "#070707"}}
          tabBarActiveTextColor = '#20a3ff'
          tabBarUnderlineStyle = {{border: ".02rem solid #20a3ff",backgroundColor: "#f7df3f"}}
          >
          <div className={styles.qrcode}>
            <div className={styles.tit}>
                <span>姓名</span>
                <span>扫码时间</span>
                <span>类别</span>
            </div>
            <div className={styles.content}>
                {
                    qrlist.length>0?qrlist.map((item)=>(
                        <div className={styles.list} key={item.id}>
                            <span>{item.us_nickname}</span>
                            <span>{item.start_time}</span>
                            <span>{item.cate}</span>
                        </div>
                    )):""
                }
            </div>
          </div>
          <div className={styles.account}>
            {
                aclist.length>0?aclist.map((item)=>(
                    <div className={styles.box} style={{borderColor:'#108ee9'}} key={item.id}>
                        <p>姓名：{item.us_nickname}</p>
                        <p>账户编号：{item.us_account}</p>
                        <p>类别：{item.cate}</p>
                        <p>注册时间：{item.add_time}</p>
                    </div>
                )):""
            }
          </div>
          {/* <div className={styles.account}>
            {
                list.length>0?list.map((item)=>(
                    <div className={styles.box} style={{borderColor:'#108ee9'}} key={item.id}>
                        <p>姓名：{item.us_nickname}</p>
                        <p>账户编号：{item.us_account}</p>
                        <p>类别：{item.cate}</p>
                        <p>扫码时间：{item.start_time}</p>
                    </div>
                )):""
            }
          </div> */}
        </Tabs>
      </div>
    )

  }
}





