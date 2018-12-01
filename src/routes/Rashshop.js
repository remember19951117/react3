import React,{Component} from 'react';
import {connect} from 'dva';
import {loggedIn,APIHost} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import styles from './style/Rashshop.less';
import Title from '../components/Title';
import {Carousel} from 'antd-mobile';
import news from '../assets/icon-img/news.png';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class Rashshop extends Component {
  state = {
    shopimg:[],
    modal1: false,
    num:1,
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
    dispatch(routerRedux.push({pathname: '/'}));
  }
  componentWillReceiveProps(nextProps){
    const { user } = nextProps;
    const data=user.shopdetails;
    const banner=this.state.shopimg;
    if(data.id){
      data.pd_pic.map((item)=>(
        banner.push({
          src:APIHost+item,
        })
      ))
      this.setState({
        shopimg:banner
      })
    }
  }
  //商品详情
  shopClick(){
    const queryString = require('query-string');
    const {dispatch,location}=this.props;
    if(location.search!==""){
      const parsed = queryString.parse(location.search);
      if(parsed.id){
        dispatch(routerRedux.push('/rashagent?id='+parsed.id));
      }
    }
  }
  render(){
    const { user } = this.props;
    const data=user.shopdetails;
    let value=data.pd_detail?data.pd_detail:"";
    let html=value.replace(/\/ueditor/g,APIHost+'/ueditor' )
    const {shopimg}=this.state;
    // 顶部title参数
    const Titles = {
      tit: "物品详情",
      rbgimg:'url(' + news + ')',
      lbgimg:'url(' + left + ')'
    }
    return (
      <div className={styles.App}>
          <style>{`
            .text_hidden3{
              -webkit-line-clamp:3;
              line-height:.35rem;
            }
            .text_hidden2{
              -webkit-line-clamp:3;
              line-height:.4rem;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              font-size:.25rem;
            }
            .slider-list{
              height:100vw !important;
            }
            .slider-list li{
              height:100vw !important;
            }
            .slider-list div{
              position:relitive;
            }
            .slider-list div img{
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                width:100%;
                height:100%;
                border:0 none;
            }
            .am-list-item{
              padding:0;
            }
            .am-list-item.am-list-item-middle .am-list-line{
              height:1rem;
            }
            .am-list-item .am-list-line .am-list-extra{
              flex-basis:70%;
              height:.7rem;
              border-radius:.1rem;
              border: solid .02rem #cacaca;
              font-size:.3rem;
              text-align:center;
            }
            .am-list-item .am-list-line .am-list-arrow{
              margin-left:-.6rem;
              width:20px;
              height:20px;
            }
            .am-list-item .am-list-line .am-list-content{
              width:2rem;
              font-size:.3rem;
              color:#070707;
              text-align:right;
              padding-right:.4rem;
              flex:none;
            }
          `}</style>
          { /* 顶部title */ }
          <Title {...Titles} leftFunc={ this.returnGoBack }/>
          <div className={styles.main}>
            <div className={styles.shopbox}>
              <Carousel
                  autoplay={false}
                  infinite
                  dots={false}
                  >
                  {
                    shopimg.map(function(item, index){
                      return(
                        <div key={index} style={{ display: 'inline-block', width: '100%',height: 'auto' }}>
                          <img
                            src={item.src}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: 'auto'  }}
                            onLoad={() => {}}
                          />
                        </div>
                      )
                    })
                  }
                </Carousel>
            </div>
            <div className={styles.content}>
              <h2>{data.pd_name}</h2>
              <p className="text_hidden2">{data.pd_content}</p>
              <div className={styles.price}>
                <p>
                  <span style={{color:'#cccccc',marginRight:'.3rem'}}>价格：</span>
                  <span style={{color:'#ff6d00'}}>￥{data.pd_price}</span>
                </p>
              </div >
              <div className={styles.modalstore}>
                <span>已售{data.pd_sales}</span>|<span>库存{data.pd_inventory}</span>
              </div>
            </div>
            <div className={styles.shop}>
                <h2>商品详情</h2>
                <div dangerouslySetInnerHTML={{__html:html}} className={styles.shopinfo}></div>
            </div>
          </div>
          <div className={styles.bottom} onClick={()=>this.shopClick()}>立即抢！Go</div>
      </div>
    )
  }
}

