import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost} from "../utils/fetch";
import {loggedIn} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/Newslist.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  home: state.home
}))
export default class Newslist extends Component {
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
  //新闻详情
  newslist(val){
    const {dispatch}=this.props;
    dispatch(routerRedux.push('/newsinfo?id='+val));
  }
  render(){
    const {home}=this.props;
    const data=home.newsList;
    // 顶部title参数
    const Titles = {
      tit: "新闻列表",
      lbgimg:'url(' + left + ')',
   }
    return (
      <div className={styles.App}>
        <style>{`
          .text_hidden2{
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp:3;
            -webkit-box-orient: vertical;
          }
        `}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main}>
            {
                data.map((list)=>(
                    <div key={list.id} className={styles.box} onClick={()=>this.newslist(list.id)}>
                        <div className={styles.imgbox}>
                        <img src={APIHost+list.pic} alt=""/></div>
                        <div className={styles.content}>
                          <h2>{list.title}</h2>
                          <p className={styles.time}>{list.add_time}</p>
                          <p className="text_hidden2">{list.simple}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    )

  }
}