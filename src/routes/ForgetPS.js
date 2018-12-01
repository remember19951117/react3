import React,{Component} from 'react';
import * as user from "../services/user";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import { List, InputItem, Toast ,Button} from 'antd-mobile';
import styles from "./style/ForgetPS.less";
import logobg from '../assets/icon-img/logobg.png';
import logo from '../assets/icon-img/logo.png';
@connect(state => ({
  user: state.user
}))
export default class Changeps extends Component {
  state={
    hide:2,
    flag:1,
    second:"获取",
    disable:1,
    phone:"",
    pwd:"",
    newpwd:"",
    code:""
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
  // 返回
  returnGoBack=()=>{
    const {dispatch}=this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  userphone(value){
    this.setState({phone:value});
  }
  userpwd(value){
    this.setState({pwd:value});
  }
  newpwd(value){
    this.setState({newpwd:value});
  }
  //忘记密码验证码
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
  //修改密码
  async changePwd(){
    const {dispatch}=this.props;
    if(this.state.phone===""){
      Toast.offline("请输入手机号",1);
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
    if(this.state.pwd!=="" && this.state.newpwd && this.state.pwd!==this.state.newpwd){
      Toast.offline("两次输入密码不一致",2);
      return;
    }else{
      let tel=this.state.phone;
      let pwd=this.state.newpwd;
      let code=this.state.code;
      const value =await user.changePwd({us_tel:tel,us_pwd:pwd,code:code});
      if(value.code===1){
        Toast.success('修改成功!',1,await function(){
          dispatch(routerRedux.push('/login'))
        })
      }else{
        Toast.offline(value.msg,2);
      }
    }
  }
  render(){
    const {hide}=this.state;
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
        `}</style>
          <div className={styles.logobg} style={{background:`url(${logobg}) center no-repeat`,backgroundSize:'100%'}}></div>
          <div className={this.state.flag===1?styles.slidedown:styles.slideup}>
            <div className={styles.logo} style={{background:`url(${logo}) center no-repeat`,backgroundSize:'contain'}}></div>
            <div className={styles.change} style={{display:hide===2?'block':'none'}}>
              <List>
                <InputItem
                    clear
                    maxLength='11'
                    type='number'
                    value={this.state.phone}
                    onChange={this.userphone.bind(this)}
                    placeholder="请输入手机号"
                    onFocus={()=>this.setState({
                      flag:2
                    })}
                    onBlur={()=>this.setState({
                      flag:1
                    })}
                  ><div>手机号</div></InputItem>
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
              <List>
                <InputItem
                  value={this.state.pwd}
                  onChange={this.userpwd.bind(this)}
                  placeholder="请输入新密码"
                  type="password"
                  onFocus={()=>this.setState({
                    flag:2
                  })}
                  onBlur={()=>this.setState({
                    flag:1
                  })}
                ><div>新密码</div></InputItem>
                  <InputItem
                  value={this.state.newpwd}
                  onChange={this.newpwd.bind(this)}
                  placeholder="请再次输入新密码"
                  type="password"
                  onFocus={()=>this.setState({
                    flag:2
                  })}
                  onBlur={()=>this.setState({
                    flag:1
                  })}
                ><div>确认密码</div></InputItem>
              </List>
            </div>
            <div className={styles.btns}>
              <Button type="primary" onClick={()=>this.changePwd()} style={{width:'4.84rem',height:'1rem',background:'linear-gradient(left,#20a3ff,#0973ea)',fontSize:'.32rem',textDecoration:'none'}}>修改密码</Button>
            </div>
          </div>
      </div>
      )
    }
}


