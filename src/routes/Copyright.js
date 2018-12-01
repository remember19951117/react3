import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {loggedIn,APIHost} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import Title from '../components/Title';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class MineInfo extends Component {
  state={
    
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
  componentDidMount(){
    
  }
  //备案
  hrefLink(){
      window.location="http://wljg.xags.gov.cn/bscx.do?method=lzxx&id=6101336101000000002921"
  }
  render(){
    const {user}=this.props;
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "关于我们",
      lbgimg:'url(' + left + ')',
      titcolor:'#fff'
    }
    return (
      <div>
          <style>{`
            .main{
              height:1rem;
              display:flex;
              justify-content:center;
              align-items:center;
            }
            .main img{
              height:.5rem;
            }
            .main span{
              color:#152e88;
              font-size:.3rem;
            }
            body{
              background-color:#fff;
            }
          `}</style>
          { /* 顶部title */ }
          <Title { ...Titles} leftFunc={ this.returnGoBack }/>
          <p style={{textAlign:'center',lineHeight:'.5rem',color:'#152e88',fontSize:'.3rem'}}>陕ICP16009918号</p>
          <div className="main" onClick={()=>this.hrefLink()}>
            <span>网站标识码：6101336101000000002921</span>
            <img src='http://wljg.xags.gov.cn/image/i_lo2.gif' border='0'></img>
          </div>
      </div>
    )
  }
}





