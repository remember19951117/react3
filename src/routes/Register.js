import React,{Component} from 'react';
import * as user from "../services/user";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import { List, InputItem, Toast ,Button} from 'antd-mobile';
import { Checkbox } from 'antd';
import styles from "./style/Register.less";
import logobg from '../assets/icon-img/logobg.png';
import logo from '../assets/icon-img/logo.png';
@connect(state => ({
  user: state.user
}))
export default class Register extends Component {
  state={
    second:"获取",
    disable:1,
    recomname:"",
    recomtel:"",
    phone:"",
    pwd:"",
    newpwd:"",
    username:"",
    code:"",
    qrcode:"",
    flag:1,
    status:false,
    checked:false,
  }
  componentWillMount(){
    const {location}=this.props;
    if(location.search!==""){
      const parsed=location.search.replace("?","").slice(7,);
      if(parsed){
        this.setState({
          qrcode:parsed
        })
      }
    }
  }
  componentDidMount(){
    const {user}=this.props;
    if(user.Recommen.us_tel){
    	this.setState({
        recomname:user.Recommen.us_account,
        recomtel:user.Recommen.us_tel,
    		status:true
    	})
    }
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
    if(user.Recommen){
    	this.setState({
        recomname:user.Recommen.us_account,
        recomtel:user.Recommen.us_tel,
    		status:true
    	})
    }
  }
  userphone(value){
    this.setState({phone:value});
  }
  userPassowrd(value){
    this.setState({pwd:value});
  }
  userpwd(value){
    this.setState({newpwd:value});
  }
  userName(value){
    this.setState({username:value});
  }
  //注册验证码
  async forgetclick(){
    this.setState({
      flag:2
    })
    let tel=this.state.phone;
    const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if(mobile.test(this.state.phone)){
      let fortime=60;
      const _this=this;
      const value =await user.getCode({ad_tel:tel});
      if(value.code===1){
        if(_this.state.disable){
          _this.setState({
            disable:0
          })
          let secon=setInterval(function(){
            _this.setState({
              second:fortime--
            })
            if(_this.state.hide===0||fortime<=-1){
              clearInterval(secon);
              _this.setState({
                second:"获取",
                disable:1
              })
            }
          },1000)
        }
      }else{
        Toast.offline(value.msg,1);
      }
    }else{
      Toast.offline("请输入11位手机号",1);
      return;
    }
  }
  onChange=(e)=>{
    if(e.target.checked){
      this.setState({
        checked:true,
        flag:2,
      })
    }else{
      this.setState({
        checked:false,
        flag:1
      })
    }
  }
  //跳转登录
  login(){
    const {dispatch}=this.props;
    let code=this.state.qrcode;
    dispatch(
      routerRedux.push('/login?qrcode='+code)
    )
  }
  //注册
  async register(){
    this.setState({
      flag:2
    })
    const {dispatch}=this.props;
    if(this.state.recomname===""){
      Toast.offline("必须填写邀请码",1);
      return;
    }
    if(this.state.phone===""){
      Toast.offline("请输入手机号",1);
      return;
    }
    if(this.state.username===""){
      Toast.offline("请输入用户名",1);
      return;
    }
    if(this.state.pwd===""){
      Toast.offline("请输入密码",1);
      return;
    }
    if(this.state.newpwd===""){
      Toast.offline("请再次输入密码",1);
      return;
    }
    if(this.state.code===""){
      Toast.offline("请输入验证码",1);
      return;
    }
    if(this.state.checked){
      let ptel=this.state.recomtel;
      let us_tel=this.state.phone;
      let name=this.state.username;
      let paswd=this.state.pwd;
      let qrcode=this.state.qrcode;
      let code=this.state.code;
      if(this.state.pwd===this.state.newpwd){
        const value =await user.register({ptel:ptel,us_tel:us_tel,us_pwd:paswd,us_nickname:name,code:code,qrcode:qrcode});
        if(value.code===1){
          Toast.success('注册成功!',1,()=>this.download())
        }else{
          Toast.offline(value.msg,2);
        }
      }else{
        Toast.offline("两次密码不一致",1);
        return;
      }
    }else{
      Toast.offline("请先阅读注册协议",2);
    }
  }
   //下载App
   download(){
    window.location="https://www.slmy10000.com/down";
  }
  render(){
    const {history}=this.props;
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
            width:27%;
            font-size:.28rem;
            color:#656565;
          }
          .am-list-item .am-input-label.am-input-label-5{
            margin:0;
          }
          .am-list-item .am-input-control{
            flex:none;
            width:73%;
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
          .ant-checkbox-wrapper{
            margin-right:.1rem;
          }
          .Agreement{
            padding:0 .6rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:.5rem;
          }
        `}</style>
          <div className={styles.logobg} style={{background:`url(${logobg}) center no-repeat`,backgroundSize:'100%'}}></div>
          <div className={this.state.flag===1?styles.slidedown:styles.slideup}>
              <div className={styles.logo} style={{background:`url(${logo}) center no-repeat`,backgroundSize:'contain'}}></div>
              <div className={styles.register}>
                <List>
                  <InputItem
                      clear
                      maxLength='11'
                      value={this.state.recomname}
                      ref="Retel"
                      disabled={this.state.status}
                      onFocus={()=>this.setState({
                        flag:2
                      })}
                      onBlur={()=>this.setState({
                        flag:1
                      })}
                    ><div>邀请码</div></InputItem>
                  <InputItem
                      clear
                      maxLength='11'
                      type='number'
                      value={this.state.phone}
                      onChange={this.userphone.bind(this)}
                      placeholder="请输入手机号"
                      ref="Phone"
                      onFocus={()=>this.setState({
                        flag:2
                      })}
                      onBlur={()=>this.setState({
                        flag:1
                      })}
                    ><div>手机号</div></InputItem>
                    <InputItem
                      clear
                      maxLength='10'
                      value={this.state.username}
                      onChange={this.userName.bind(this)}
                      placeholder="请输入姓名"
                      ref="username"
                      onFocus={()=>this.setState({
                        flag:2
                      })}
                      onBlur={()=>this.setState({
                        flag:1
                      })}
                    ><div>用户名</div></InputItem>
                  <InputItem
                    clear
                    maxLength='16'
                    value={this.state.pwd}
                    onChange={this.userPassowrd.bind(this)}
                    placeholder="请输入密码"
                    type="password"
                    ref="Pwd"
                    onFocus={()=>this.setState({
                      flag:2
                    })}
                    onBlur={()=>this.setState({
                      flag:1
                    })}
                  ><div>密码</div></InputItem>
                  <InputItem
                    clear
                    maxLength='16'
                    type="password"
                    value={this.state.newpwd}
                    onChange={this.userpwd.bind(this)}
                    placeholder="请再次输入密码"
                    ref="newpwd"
                    onFocus={()=>this.setState({
                      flag:2
                    })}
                    onBlur={()=>this.setState({
                      flag:1
                    })}
                  ><div>确认密码</div></InputItem>
                </List>
                <div className={styles.codes}>
                  <span >验证码</span><div><input type="text" value={this.state.code} onChange={(e)=>this.setState({
                    code:e.target.value
                  })} onFocus={()=>this.setState({
                    flag:2
                  })}
                  onBlur={()=>this.setState({
                    flag:1
                  })}/><button onClick={this.state.disable===1?this.forgetclick.bind(this):()=>{}}>{this.state.second}</button></div>
                </div>
              </div>
              <div className="Agreement">
                <div>
                  <Checkbox onChange={(e)=>this.onChange(e)}></Checkbox>请确认已阅读<span onClick={()=>history.push('/agreement')} style={{color:'#0973ea',padding:0}}>注册协议</span>
                </div>
                <div>
                  <span>已有账号</span>
                  <span style={{color:'#0973ea',padding:0}} onClick={()=>this.login()}>立即登录</span>
                </div>
              </div>
              <div className={styles.btns}>
                <Button type="primary" onClick={()=>this.register()} style={{width:'4.84rem',height:'1rem',background:'linear-gradient(left,#20a3ff,#0973ea)',fontSize:'.32rem',textDecoration:'none'}}>注册</Button>
              </div>
          </div>
      </div>
      )
    }
}


