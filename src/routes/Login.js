import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {login} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import { List, InputItem, Toast ,Button} from 'antd-mobile';
import styles from "./style/login.less";
import logobg from '../assets/icon-img/logobg.png';
import logo from '../assets/icon-img/logo.png';
var queryString = require('querystring');
@connect(state => ({
  user: state.user
}))
export default class Login extends Component {
  state={
    username:"",
    password:"",
    success:false,
    flag:1
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
  //判断微信访问
  componentWillMount() {
    const {location}=this.props;
    let is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
    if(is_weixin){
      if(location.search!==""){
        location.search=location.search.replace("?","")
        const parsed = queryString.parse(location.search);
        if (parsed.code) {
          this.goWechat(parsed.code);
        }else if(parsed.qrcode){
          let code=location.search.slice(7,);
          // this.WechatCode(code);
          setTimeout(this.WechatCode(code),5000)
        }
      }else{
        this.getWechatCode();
      }
    }else{
      return;
    }
  }
  async goWechat(code){
    const value=await User.Wechat({code});
    if (value.code===1) {
    }else{
      Toast.fail("微信授权失败",2)
    }
  }
  imputUsername(value){
    if(value!==""&&this.state.password!==""){
      this.setState({username:value});
    }else{
      this.setState({username:value});
    }
  }
  imputPassword(value){
    if(this.state.username!==""&&value!==""){
      this.setState({password:value});
    }else{
      this.setState({password:value});
    }
  }
  // 登录
  async login(){
    this.setState({
      flag:2
    })
    const {dispatch,location}=this.props;
    let username=this.state.username;
    let password=this.state.password;
    if (username===""||password==="") {
      Toast.offline("帐号和密码不能为空!",2);
      return;
    }
    Toast.loading("正在登录", 0);
    
    if(location.search!==""){
        location.search=location.search.replace("?","")
        const parsed = queryString.parse(location.search);
        if(parsed.qrcode){
          let is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
          if(is_weixin){
            var code=location.search.slice(7,).split("&code")[0];
          }else{
            var code=location.search.slice(7,);
          }
        }
    }
    const value =await User.userlogin({username:username,password:password,qrcode:code?code:"",});
    Toast.hide();
    if(value.code===1){
      dispatch({
        type: 'user/getUser',
        payload: {
          userInfo:value.data
        }
      });
      login(username,password);
      Toast.success('登录成功!',1,await function(){
        dispatch(routerRedux.push('/?reward=1'))
      });
    }else{
      Toast.fail(value.msg, 2);
    }
  }
  //调取微信code
  getWechatCode(){
    window.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3d7755dcd2bf370e&redirect_uri=http%3a%2f%2fwww.slmy10000.com%2flogin&response_type=code&scope=snsapi_base#wechat_redirect";
  }
  //有qrcode编码
  WechatCode(val){
    window.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3d7755dcd2bf370e&redirect_uri=http%3a%2f%2fwww.slmy10000.com%2flogin?qrcode="+val+"&response_type=code&scope=snsapi_base#wechat_redirect";
  }
  render(){
    const {history} = this.props;
    return(
      <div className={styles.App} >
        <style>{`
          html{
            background-color: #f3f2ec;
          }
          html:not([data-scale]) .am-list-body::after,html:not([data-scale]) .am-list-body::before{
            content:"";
            height:0;
          }
          html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
            content:"";
            height:0;
          }

          .am-button{
            line-height:1rem;
          }
          html:not([data-scale]) .am-button-primary::before, .am-button-primary::after{
            content:"";
            border:0;
          }

          .am-list-item.am-input-item{
            padding:0;
            height:1.2rem;
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
            width:80%;
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
          <div className={styles.logobg} style={{background:`url(${logobg}) center no-repeat`,backgroundSize:'100%'}}></div>
          <div className={this.state.flag===1?styles.slidedown:styles.slideup}>
            <div className={styles.logo} style={{background:`url(${logo}) center no-repeat`,backgroundSize:'contain'}}></div>
            <div className={styles.login}>
              <List>
                <InputItem
                  clear
                  ref={el => this.labelFocusInst = el}
                  maxLength='11'
                  type='number'
                  onChange={this.imputUsername.bind(this)}
                  placeholder="请输入账号"
                  onFocus={()=>this.setState({
                    flag:2
                  })}
                  onBlur={()=>this.setState({
                    flag:1
                  })}
                ><div>账号</div></InputItem>
                <InputItem
                  type="password"
                  placeholder="请输入密码"
                  maxLength='16'
                  clear
                  onChange={ this.imputPassword.bind(this) }
                  onFocus={()=>this.setState({
                    flag:2
                  })}
                  onBlur={()=>this.setState({
                    flag:1
                  })}
                ><div>密码</div></InputItem>
              </List>
              <p>
                <span style={{float:'left'}}></span><span style={{float:'right'}} onClick={()=>history.push('/forget')}>忘记密码</span>
              </p>
            </div>
            <div className={styles.btns}>
              <Button type="primary" onClick={()=>this.login()} style={{width:'4.84rem',height:'1rem',background:'linear-gradient(left,#20a3ff,#0973ea)',fontSize:'.32rem',textDecoration:'none'}}>登录</Button>
            </div>
          </div>
      </div>
      )
    }
}


