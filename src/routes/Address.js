import React,{Component} from 'react';
import * as user from "../services/user";
import {loggedIn} from "../utils/fetch";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Address.less';
import left from '../assets/icon-img/return.png';
import right from '../assets/icon-img/news.png';
import icon01 from '../assets/icon-img/edit.png';
import icon02 from '../assets/icon-img/delete.png';
import icon03 from '../assets/icon-img/location.png';

@connect(state => ({
  user: state.user
}))

export default class Address extends Component {
  state={
    src:1,
    srcflag:1,
  }
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
  //修改地址
  async edit(id,e){
    e.stopPropagation();
    const {dispatch,} = this.props;
    dispatch(routerRedux.push('/addsite?id='+id));
  }
  //删除地址
  async dell(id,index,e){
    e.stopPropagation();
    const {dispatch,} = this.props;
    const data =await user.dellSite({key:'user_addr',id:id})
    if(data.code===1){
      Toast.success(data.msg,1)
      dispatch({
        type: 'user/dellAddress',
        payload:{
          index:index
        }
      });
    }else{
      Toast.fail(data.msg, 2);
    }
  }
   //选择地址
  async selsetitem(val){
    const {dispatch,location} = this.props;
    const queryString = require('query-string');
    if(location.search!==""){
      location.search=location.search.replace("?","")
      const parsed = queryString.parse(location.search);
      if(parsed.num){
        let num=parsed.num;
        let pd_id=parsed.id;
        let data = {
          "pd_id": pd_id*1,
          "addr_id": val,
          "pd_num":num*1,
        }
        const datas =await user.directOrder({data:data});
        if(datas.code===1){
          Toast.success(datas.msg,2,await function(){
            dispatch(routerRedux.push('/shoppay?id='+datas.data));
          })
        }else{
          Toast.offline(datas.msg,2)
        }
      }else{
        let or_id=parsed.id;
        let data = {
          "or_id": or_id*1,
          "addr_id": val,
        }
        const datas =await user.Order({data:data});
        if(datas.code===1){
          dispatch(routerRedux.push('/shoppay?id='+or_id));
        }
      }
    }
  }
  render(){
    const {user}=this.props;
    const data=user.addressList;
    const {history}=this.props;
    // 顶部title参数
    const Titles = {
      tit: "选择地址",
      lbgimg:'url(' + left + ')',
      rbgimg:'url(' + right + ')',
   }
    return (
      <div className={styles.App}>
        <style>{`
          .text_hidden2{
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            line-height:.4rem;
        }`}</style>
        { /* 顶部title */ }
        <Title { ...Titles} leftFunc={ this.returnGoBack }/>
        <div className={styles.main}>
          {
            data.map((list,index)=>(
              <div key={list.id} onClick={()=>this.selsetitem(list.id)}>
                <img src={icon03} alt=""/>
                <div className={styles.content}>
                  <div className={styles.top}>
                    <span>收货人&nbsp;&nbsp;&nbsp;&nbsp;{list.addr_receiver}</span><span>{list.addr_tel}</span>
                  </div>
                  <p className="text_hidden2">{list.addr_addr+list.addr_detail}</p>
                  <div className={styles.menu}>
                    <img src={icon02} alt="" onClick={(e)=>this.dell(list.id,index,e)}/>
                    <img src={icon01} alt="" onClick={(e)=>this.edit(list.id,e)}/>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.menus} onClick={()=>history.push('/addsite')}>添加新地址</div>
      </div>
    )

  }
}





