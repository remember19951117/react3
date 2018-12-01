import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {APIHost,loggedIn} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import styles from './style/Rushagent.less';
import Title from '../components/Title';
import {Carousel,Toast,List,InputItem} from 'antd-mobile';
import left from '../assets/icon-img/return.png';
import add from '../assets/icon-img/add.png';
import reduce from '../assets/icon-img/reduce.png';
@connect(state => ({
  user: state.user
}))
export default class Rashagent extends Component {
  state = {
    shopimg:[],
    bank:"",
    name:"",
    num:1,
    maxnum:""
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
  componentDidMount(){
    window.addEventListener('resize',()=>this.resize(),100);
  }
  resize(){
    if (document.activeElement.tagName == 'INPUT') {
      document.activeElement.scrollIntoViewIfNeeded();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize',()=>this.resize());
  }
  componentWillReceiveProps(nextProps){
    const { user } = nextProps;
    const data=user.RashInfo;
    const banner=this.state.shopimg;
    if(data.pd_name){
      data.pd_pic.map((item)=>(
        banner.push({
          src:APIHost+item,
        })
      ))
      this.setState({
        shopimg:banner,
        maxnum:data.agency_num
      })
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  imputBank(val){
    this.setState({
      bank:val
    })
  }
  imputName(val){
    this.setState({
      name:val
    })
  }
  //抢购
  async rash(){
    const queryString = require('query-string');
    const {dispatch,location}=this.props;
    if(location.search!==""){
      const parsed = queryString.parse(location.search);
      let bank=this.state.bank;
      let name=this.state.name;
      let id=parsed.id;
      let num=this.state.num;
      if(bank===""){
        Toast.offline("请输入转账账号",2)
        return;
      }
      if(name===""){
        Toast.offline("请输入真实姓名",2)
        return;
      }
      const data =await User.Rashshop({bank_num:bank,bank_person:name,pd_id:id,agency_num:num});
      if(data.code===1){
        Toast.success("抢购成功",2,()=>{
          dispatch(routerRedux.push("/rash"))
        })
      }else{
        Toast.offline(data.msg,2,()=>{
          dispatch(routerRedux.push("/agent"))
        })
      }
    }
  }
  //增加
  add(){
    let pd_num=this.state.num;
    pd_num+=1;
    if(pd_num>this.state.maxnum){
      Toast.offline("最大数量为"+this.state.maxnum,2)
    }else{
      this.setState({
        num:pd_num
      })
    }
  }
  //减少
  reduce(){
    let pd_num=this.state.num;
    pd_num-=1;
    if(pd_num<=0){
      Toast.offline("最小数量为1",2)
    }else{
      this.setState({
        num:pd_num
      })
    }
  }
  render(){
    const { user } = this.props;
    const data=user.RashInfo;
    const {shopimg}=this.state;
    // 顶部title参数
    const Titles = {
      tit: "抢购信息",
      lbgimg:'url(' + left + ')'
    }
    //左箭头
    const leftitem={
      backgroundImage: 'url(' + reduce + ')'
    }
    //右箭头
    const rightitem={
      backgroundImage: 'url(' + add + ')'
    }
    return (
      <div className={styles.App}>
          <style>{`
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
            html:not([data-scale]) .am-list-body::after,html:not([data-scale]) .am-list-body::before,html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
              content:"";
              height:0;
            }
            .am-list-item.am-input-item{
              padding:0;
              height:1rem;
            }
            .am-list-item .am-list-line {
              padding:0;
              position:relative;
            }
            .am-list-item .am-input-clear{
              position:absolute;
              top:50%;
              right:.3rem;
              transform:translateY(-50%);
              overflow:initial;
              box-sizing:border-box;
            }
            .am-list-item .am-input-label{
              width:20%;
              font-size:.28rem;
              color:#656565;
            }
            .am-list-item .am-input-label.am-input-label-5{
              margin:0;
              width:27%;
            }
            .am-list-item .am-input-label.am-input-label-5 div{
              text-align:center;
            }
            .am-list-item .am-input-control{
              flex:none;
              width:70%;
            }
            .am-list-item .am-input-control input{
              width: 100%;
              height:.73rem;
              border-radius:.1rem;
              border: solid .02rem #cacaca;
              padding: 0 .3rem;
              font-size:.28rem;
            }
            .am-input-focus .am-input-control input{
              border: solid .02rem #20a3ff;
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
              <p>
                <span>代理价：￥{data.pd_agency_price}</span>
                <span>最大代理数量：{data.agency_num}</span>
              </p>
              <p style={{fontSize:'.2rem',color:'#656565',lineHeight:'.5rem'}}>请转账到指定账户,审核通过将为您发货,请留意申请进度</p>
              <div className={styles.number}>
                <p>代理数量：</p>
                <div className={styles.stepper}>
                  <span onClick={()=>this.reduce()} style={leftitem}></span>
                  <span>{this.state.num}</span>
                  <span onClick={()=>this.add()} style={rightitem}></span>
                </div>
              </div>
              <p className={styles.allmoney}>合计金额：<span style={{color:'#ff6d00',fontSize:'.4rem'}}>￥{Math.round(parseFloat(data.pd_agency_price*this.state.num*100))/100}</span></p>
              <h3>收款账号：{data.bank_num}</h3>
              <h3>收款人：{data.bank_person}</h3>
            </div>
            <div className={styles.userinfo}>
              <h2>请输入您线下转账的账号及姓名</h2>
              <List>
                <InputItem
                  clear
                  ref={el => this.labelFocusInst = el}
                  maxLength='19'
                  type='number'
                  onChange={this.imputBank.bind(this)}
                  placeholder="请输入账号"
                ><div>账号</div></InputItem>
                <InputItem
                  placeholder="请输入真实姓名"
                  maxLength='16'
                  clear
                  onChange={ this.imputName.bind(this) }
                ><div>真实姓名</div></InputItem>
              </List>
            </div>
          </div>
          <div className={styles.menus} onClick={()=>this.rash()}>立即抢购</div>
      </div>
    )
  }
}

