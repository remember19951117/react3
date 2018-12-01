import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn,loginOut} from "../utils/fetch";

import styles from './style/Mine.less';
import Title from '../components/Title';
import { List ,WhiteSpace,Toast} from 'antd-mobile';
import MyTabBar from "../components/TabBar";
import news from '../assets/icon-img/news.png';
import moneybag from '../assets/icon-img/moneybag.png';
import icon00 from '../assets/icon-img/icon00.png';
import icon01 from '../assets/icon-img/icon01.png';
import icon02 from '../assets/icon-img/icon02.png';
import icon03 from '../assets/icon-img/icon03.png';
import icon04 from '../assets/icon-img/icon04.png';
import icon05 from '../assets/icon-img/icon05.png';
import icon06 from '../assets/icon-img/icon06.png';
import icon07 from '../assets/icon-img/icon07.png';
import icon08 from '../assets/icon-img/icon08.png';
@connect(state => ({
  user: state.user
}))
export default class Mine extends Component {

  state = {
    selectedTabBar: 'mine',
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
      dispatch(routerRedux.push({pathname: '/login'}));
    }
  }
  
  // 返回
  returnGoBack(){
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  //退出登录
  async loginout(){
    const {dispatch} = this.props;
    loginOut()
    Toast.success('退出成功!', 2, await function(){
      dispatch(routerRedux.push('/login'));
    });
  }
  //下载App
  download(){
    window.location="https://www.slmy10000.com/down";
  }

  render(){
    const {user}=this.props;
    const data=user.userInfo;
    const Item = List.Item;
    // 顶部title参数
    const Titles = {
      righticon: 1,
      bgc: "#ffe12d",
      tit: "个人中心",
      titcolor:'#fff',
      rbgimg:'url(' + news + ')'
    }
    // 传入tabBar参数
    const {history} = this.props;
    const tabBarProps = {
      selectedTabBar: this.state.selectedTabBar,
      history
    }
    const money={
      backgroundImage: 'url(' + moneybag + ')',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center'
    }
    const shopimg=APIHost+user.userInfo.us_head_pic;
    const head={
      backgroundImage:'url(' + shopimg + ')',
      backgroundSize:'cover',
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat'
    }
    return (
      <div className={styles.App}>
        <style>{`
              html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
                content:"";
                height:0;
              }
              html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
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
              .am-list-item img{
                max-width:.44rem;
                height:auto;
                width:auto;
                max-height:.44rem;
              }
          `}</style>
        { /* 顶部title */ }
        <Title {...Titles}/>
        <div className={styles.content}>
            {/* 头部 */}
            <div className={styles.header}>
              <div className={styles.headinfo} onClick={()=>history.push('/mineinfo')}>
                <div className={styles.headimg} >
                  <img src="" alt="" style={head}/>
                  <div className={styles.grate} style={{display:data.gave_status<=1?'none':'block'}}>{data.gave_status<=1?"消费商":(data.gave_status===2?"代理商":(data.gave_status===3?"钱库代理商":(data.gave_status===4?"银库代理商":(data.gave_status===5?"金库代理商":(data.gave_status===6?"金钻代理商":(data.gave_status===7?"荣誉董事":(data.gave_status===8?"一星董事":(data.gave_status===9?"二星董事":(data.gave_status===10?"三星董事":"")))))))))}</div>
                  </div>
                    <div className={styles.userinfo}>
                      <p>
                        <span>姓名:</span>
                        <span>{data.us_nickname}</span>
                      </p>
                      <p>
                        <span>{data.gave_status<=1?"消费商编码：":"代理商编码："}</span>
                        <span>{data.us_account}</span>
                      </p>
                      <p>
                        <span>注册日期：</span>
                        <span>{data.us_add_time}</span>
                      </p>
                    </div>
                  </div>
              <div className={styles.money} onClick={()=>history.push('/putforward')}>
                <i style={money} ></i>
                <span className={styles.sale}>红包余额</span>
                <span>{data.us_shop_bi}</span>
              </div>
            </div>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon00}
              arrow="horizontal"
              onClick={()=>history.push('/datainfo')}
            >完善资料</Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
              <Item
                thumb={icon01}
                onClick={()=>history.push('/agent')}
                arrow="horizontal"
              >
                申请代理
              </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon02}
              onClick={()=>history.push('/mineteam')}
              arrow="horizontal"
            >
              团队详情
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon03}
              onClick={()=>history.push('/forget')}
              arrow="horizontal"
            >
              修改密码
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon04}
              onClick={()=>history.push('/address')}
              arrow="horizontal"
            >
              地址管理
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef',display:data.gave_status>1?'block':'none'}}/>
            <Item
              thumb={icon05}
              onClick={()=>history.push('/myorder')}
              arrow="horizontal"
              style={{display:data.gave_status>1?'flex':'none'}}
            >
              我的订单
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon06}
              onClick={()=>history.push('/money')}
              arrow="horizontal"
            >
              财务管理
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon07}
              onClick={()=>history.push('/rashlist')}
              arrow="horizontal"
            >
              抢购记录
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              thumb={icon08}
              onClick={()=>history.push('/account')}
              arrow="horizontal"
            >
              账户管理
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef',display:data.gave_status>1?'block':'none'}}/>
            <Item
              thumb={icon05}
              onClick={()=>history.push('/copyright')}
              arrow="horizontal"
            >
              关于我们
            </Item>
            <WhiteSpace style={{height:'.1rem',backgroundColor:'#efefef'}}/>
            <Item
              arrow="horizontal"
              onClick={()=>this.download()}
            >下载App</Item>
          <WhiteSpace style={{height:'.2rem',backgroundColor:'#efefef'}}/>
          <Item
            onClick={()=>this.loginout()}
            arrow="horizontal"
          >
          退出登录
          </Item>
          <WhiteSpace style={{height:'.2rem',backgroundColor:'#efefef'}}/>
            </div>
            { /* 底部导航 */ }
            <MyTabBar { ...tabBarProps}/>
        </div>
    )
  }
}
