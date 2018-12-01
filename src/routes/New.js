import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/New.less';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  home: state.home
}))
export default class News extends Component {
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  render(){
    const {home}=this.props;
    const data=home.newsInfo;
    let value=data.content?data.content:"";
    let html=value.replace(/\/ueditor/g,APIHost+'/ueditor' )
    // 顶部title参数
    const Titles = {
      tit: "新闻详情",
      lbgimg:'url(' + left + ')',
   }
    return (
      <div className={styles.App}>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main}>
            <h2>{data.title}</h2>
            <p>{data.add_time}</p>
            <div className={styles.box} dangerouslySetInnerHTML={{__html:html}}></div>
        </div>
      </div>
    )

  }
}