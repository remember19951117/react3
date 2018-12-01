import React,{Component} from 'react';
import {connect} from 'dva';
import {APIHost,loggedIn} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import Title from '../components/Title';
import styles from './style/Myteam.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Myteam extends Component {
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
    // 顶部title参数
    const Titles = {
      tit: "我的团队",
      lbgimg:'url(' + left + ')',
   }
   const {user}=this.props;
   const data=user.teamList;
    return (
      <div className={styles.App}>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.headinfo}>
          <p>代理商姓名：{data.us_nickname}</p>
          <p>我直接推荐的代理商：<span className={styles.red}>{data.direct_num}</span>人</p>
          <p>我的下属代理商：<span className={styles.red}>{data.all_num}</span>人</p>
        </div>
        <div className={styles.main}>
          {
            user.teamList.list?data.list.map((user)=>
              <div className={styles.list} key={user.id}>
                  <img src="" alt="" style={{background:`url(${APIHost+user.us_head_pic}) center no-repeat`,backgroundSize:'contain'}}/>
                  <div className={styles.userinfo}>
                    <p>{user.us_account}</p>
                    <p>姓名：{user.us_nickname}</p>
                    <p className={styles.date}>注册时间：{user.us_add_time}</p>
                  </div>
              </div>
            ):""
          }
        </div>
      </div>
    )

  }
}





