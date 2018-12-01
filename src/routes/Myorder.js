import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/Myorder.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Myorder extends Component {
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
    // 顶部title参数
    const Titles = {
      tit: "我的订单",
      lbgimg:'url(' + left + ')',
   }
   const data=user.myorderList;
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
        <div className={styles.main}>
          <div className={styles.list}>
                <span>代理商品类别</span>
                <span>数量</span>
          </div>
          {
              data.map((list)=>
                <div className={styles.list} key={list.id}>
                    <span>{list.ca_name}</span>
                    <span>{list.qr_num}</span>
                </div>
              )
          }
        </div>
      </div>
    )

  }
}





