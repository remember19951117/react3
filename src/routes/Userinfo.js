import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost} from "../utils/fetch";
import { List ,WhiteSpace,} from 'antd-mobile';
import {loggedIn} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/Userinfo.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Userinfo extends Component {
    componentWillMount(){
        const { dispatch } = this.props;
        const user = loggedIn();
        if(!user){
            dispatch(routerRedux.push({pathname: '/login'}));
        }
    }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  render(){
    const {user}=this.props;
    const data=user.userInfo;
    // 顶部title参数
    const Titles = {
      tit: "查看资料",
      lbgimg:'url(' + left + ')',
   }
    return (
      <div className={styles.App}>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main}>
          <div className={styles.card} style={{background:`url(${APIHost+data.us_card_front_pic}) center no-repeat`,backgroundSize:'contain'}}></div>
          <div className={styles.card} style={{background:`url(${APIHost+data.us_card_reverse_pic}) center no-repeat`,backgroundSize:'contain'}}></div>
          <p>
            <span>身份证号码</span>
            <span>{data.us_id_card}</span>
          </p>
          <p>
            <span>银行卡号</span>
            <span>{data.us_bank_number}</span>
          </p>
          <p>
            <span>银行名称</span>
            <span>{data.us_bank}</span>
          </p>
          <p className={styles.address}>
            <span>开户行地址</span>
            <span>{data.us_bank_addr}</span>
          </p>
          <p>
            <span>真实姓名</span>
            <span>{data.us_nickname}</span>
          </p>
        </div>
      </div>
    )

  }
}