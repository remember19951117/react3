import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {loggedIn,APIHost} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import styles from './style/mineInfo.less';
import { List,InputItem,Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/icon-img/return.png';
@connect(state => ({
  user: state.user
}))
export default class MineInfo extends Component {
  state={
    nickname:"",
    headimg:""
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
  componentWillReceiveProps(props){
    const {user}=props;
    const data=user.userInfo;
    if(data.us_nickname){
      this.setState({
        nickname:data.us_nickname,
        headimg:data.us_head_pic
      })
    }
  }
  componentDidMount(){
    const {user}=this.props;
    const data=user.userInfo;
    if(data.us_nickname){
      this.setState({
        nickname:data.us_nickname,
        headimg:data.us_head_pic
      })
    }
  }
  //头像上传
  async getLocalImg(e){
    var formData = new FormData();
    formData.append("Filename", e.target.files[0].name);
    formData.append("imgFile",e.target.files[0]);
    Toast.loading("正在上传头像", 0);
    const result =await User.uploadImg(formData);
    Toast.hide();
    if(result.code ===1){
      this.setState({
        headimg:result.data
      })
      Toast.success('上传成功!',1);
    }else{
      Toast.offline("上传失败请重新尝试",1);
    }
  }
  imputname(value){
    this.setState({
      nickname:value
    })
  }
  async Save(){
    const {dispatch}=this.props;
    let uname=this.state.nickname;
    let head=this.state.headimg;
    const result =await User.editUser({us_head_pic:head,us_nickname:uname});
    if(result.code===1){
      Toast.success(result.msg,1,await function(){
        dispatch(routerRedux.push('/mine'))
      });
    }else{
      Toast.offline(result.msg,1);
    }
  }
  render(){
    const {user}=this.props;
    const data=user.userInfo;
    // 顶部title参数
    const Titles = {
      bgc: "#ffe12d",
      tit: "个人资料",
      lbgimg:'url(' + left + ')',
      titcolor:'#fff'
    }
    const Item = List.Item;
    return (
      <div className={styles.App}>
          <style>{`
              html:not([data-scale]) .am-list-body::before,html:not([data-scale]) .am-list-body::after{
                content:"";
                height:0;
              }
              .am-list-item .am-input-label{
                color:#070707;
                font-size:.3rem;
              }
              .am-list-item,.am-list-item.am-input-item{
                height:1rem
              }
              .am-image-picker-list,.am-image-picker-list .am-flexbox{
                padding:0;
                margin:0;
              }
              .am-list-item .am-list-line .am-list-content{
                color:#070707;
                font-size:.3rem;
              }
              .am-list-item .am-list-line .am-list-extra{
                color:#070707;
                font-size:.3rem;
              }
              .imgbox{
                height:1.5rem;
              }
              .imgbox .am-list-line .am-list-extra{
                padding:0;
                height:1rem;
                width:1rem;
                overflow:hidden;
                flex-basis:1rem;
                position:relative;
              }
              .imgbox .labe{
                width:1rem;
                height:1rem;
              }
              .imgbox input{
                display:none;
              }
              .imgbox img{
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
              }
              .bankcard .am-list-line .am-list-extra{
                padding:0;
                flex-basis:4rem;
              }
              .menus{
                position: absolute;
                height:1rem;
                bottom: 0;
                left: 0;
                width: 100%;
                background: linear-gradient(left,#20a3ff,#0973ea);
                line-height: 1rem;
                text-align: center;
                font-size: .3rem;
                color: #fff;
              }
          `}</style>
          { /* 顶部title */ }
          <Title { ...Titles} leftFunc={ this.returnGoBack }/>
          <List>
              <Item className="imgbox" extra={
                  <label  htmlFor="img" className="labe">
                    <input type="file" onChange={this.getLocalImg.bind(this)} accept="image/*" id="img"/>
                    <img ref="headImg" src={APIHost+this.state.headimg} style={{width:'1rem',height:'1rem',borderRadius:"50%"}} alt=""/>
                  </label>}
                >头像
              </Item>
              <InputItem
                clear
                value={this.state.nickname}
                onChange={(val)=>this.imputname(val)}
                maxLength={10}
                ref="name"
                >姓名</InputItem>
              <Item extra={data.us_tel}>手机号</Item>
              <Item extra={data.us_bank}>开户行</Item>
              <Item className="bankcard" extra={data.us_bank_number}>银行卡号</Item>
          </List>
          <div className={styles.menus} onClick={()=>this.Save()}>保存</div>
      </div>
    )

  }
}





