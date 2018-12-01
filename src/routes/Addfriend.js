import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost} from "../utils/fetch";
import Title from '../components/Title';
import styles from './style/Addfriend.less';
import left from '../assets/icon-img/return.png';
import bgimg from '../assets/icon-img/bg.jpg';
var queryString = require('querystring');
var timeOutEvent=0;
@connect(state => ({
  user: state.user
}))
export default class Addfriend extends Component {
    state={
        val:""
    }
    componentWillReceiveProps(props){
        const {location}=props;
        if(location.search!==""){
            const parsed = queryString.parse(location.search.replace("?",""));
            if(parsed.id==1){
                this.setState({
                    val:0
                })
            }else if(parsed.id==2){
                this.setState({
                    val:1
                })
            }
        }
    }
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
    touchstart(){
        const _this=this;   
        timeOutEvent = setTimeout(function(){
            _this.longPress()
        },2000);
        return false;   
    };   
    gtouchend(){   
        clearTimeout(timeOutEvent);//清除定时器   
        if(timeOutEvent!==0){   
        }   
        return false;   
    };   
    gtouchmove(){   
        clearTimeout(timeOutEvent);//清除定时器   
        timeOutEvent = 0;   
    };   
    longPress(){
        const {user}=this.props;
        timeOutEvent = 0;   
        alert("imgUrl:"+`${APIHost+user.imgurl}`);   
    }   
  render(){
    const {user}=this.props;
    const img=user.imgurl;
    // 顶部title参数
    const Titles = {
      tit: "好友添加",
      lbgimg:'url(' + left + ')',
   }
    return (
      <div className={styles.App}>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main} >
        {/* style={{background:`url(${bgimg}) center no-repeat`,backgroundSize:'contain'}} */}
            <img className={styles.imgbox} src={APIHost+img} alt="" onTouchStart={()=>this.touchstart()} onTouchEnd={()=>this.gtouchend()} onTouchMove={()=>this.gtouchmove()}/>
            <p style={{color:'red',fontSize:'.4rem',lineHeight:'.8rem'}}>注意：长按图片下载，线下{this.state.val?"微信":"支付宝"}添加好友，以方便线下打款，否则可能会造成资金提现失败！！！</p>
        </div>
      </div>
    )

  }
}