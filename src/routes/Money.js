import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import { List} from 'antd-mobile';
import {loggedIn} from "../utils/fetch";
import Title from '../components/Title';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Money extends Component {
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
    // 顶部title参数
    const Titles = {
      tit: "提现记录",
      lbgimg:'url(' + left + ')',
   }
   const Item = List.Item;
   const {history} = this.props;
    return (
      <div>
        <style>{`
            html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
                content:"";
                height:0;
              }
              .am-list-item{
                padding-left:.3rem;
                height:.9rem;
              }
              .am-list-item .am-list-line{
                padding-right:.3rem;
              }
              .am-list-item .am-list-line .am-list-content{
                font-size:.3rem;
                color:#303030;
              }
        `}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <Item
            onClick={()=>history.push('/profit')}
            arrow="horizontal">
            我的收益
        </Item>
        <Item
            onClick={()=>history.push('/putforward')}
            arrow="horizontal">
            提现申请
        </Item>
        <Item
            onClick={()=>history.push('/paylist')}
            arrow="horizontal">
            提现记录
        </Item>
        
      </div>
    )

  }
}





