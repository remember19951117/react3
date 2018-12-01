import React,{Component} from 'react';
import * as User from "../services/user";
import {connect} from 'dva';
import {loggedIn,APIHost} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import { List,InputItem,Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/icon-img/return.png';
import styles from './style/Information.less';
import add from '../assets/icon-img/addimg.png';
@connect(state => ({
  user: state.user
}))
export default class Information extends Component {
  state={
    fontimg:"",
    backimg:"",
    bank:0,
    idcard:"",
    name:"",
    bankcard:"",
    bankname:"",
    address:"",
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
    const {user}=this.props;
    const data=user.userInfo;
    window.addEventListener('resize',()=>this.resize(),100);
    // if(data.id){
    //   this.setState({
    //     fontimg:data.us_card_front_pic,
    //     backimg:data.us_card_reverse_pic,
    //     idcard:data.us_id_card,
    //     name:data.us_nickname,
    //     bankcard:data.us_bank_number,
    //     bankname:data.us_bank,
    //     address:data.us_bank_addr
    //   })
    // }
  }
  resize(){
      if (document.activeElement.tagName == 'INPUT') {
        document.activeElement.scrollIntoViewIfNeeded();
      }
  }
  componentWillUnmount() {
    window.removeEventListener('resize',()=>this.resize());
  }
  //身份证正面图片上传
  async getFontimg(e){
    var formData = new FormData();
    formData.append("Filename", e.target.files[0].name);
    formData.append("imgFile",e.target.files[0]);
    Toast.loading("正在提交", 0);
    var result =await User.uploadImg(formData);
    Toast.hide();
    if(result.code ===1){
      this.setState({
        fontimg:result.data
      })
      Toast.success('上传成功!',1);
    }else{
      Toast.offline("上传失败请重新尝试",1);
    }
  }
  //身份证背面图片上传
  async getBackimg(e){
    var formData = new FormData();
    formData.append("Filename", e.target.files[0].name);
    formData.append("imgFile",e.target.files[0]);
    Toast.loading("正在提交", 0);
    var result =await User.uploadImg(formData);
    Toast.hide();
    if(result.code ===1){
      this.setState({
        backimg:result.data
      })
      Toast.success('上传成功!',1);
    }else{
      Toast.offline("上传失败请重新尝试",1);
    }
  }
  imputIdcard(value){
    this.setState({
      idcard:value
    })
  }
  imputName(value){
    this.setState({
      name:value
    })
  }
  imputBankcard(value){
    this.setState({
      bankcard:value
    })
  }
  imputBank(value){
    this.setState({
      bankname:value
    })
  }
  imputAddress(value){
    this.setState({
      address:value
    })
  }
  //保存
  async Determine(){
    const {dispatch}=this.props;
    if(this.state.fontimg===""){
      Toast.offline("请上传身份证正面",1);
      return;
    }
    if(this.state.backimg===""){
      Toast.offline("请上传身份证背面",1);
      return;
    }
    if(this.state.name===""){
      Toast.offline("请填写真实姓名",1);
      return;
    }
    if(this.state.idcard===""){
      Toast.offline("请填写身份证号",1);
      return;
    }
    if(this.state.bankcard===""){
      Toast.offline("请填写银行卡号",1);
      return;
    }
    if(this.state.bankname===""){
      Toast.offline("请填写开户行",1);
      return;
    }
    if(this.state.address===""){
      Toast.offline("请填写开户行地址",1);
      return;
    }
    var data={
      "us_card_front_pic":this.state.fontimg,
      "us_card_reverse_pic":this.state.backimg,
      "us_id_card":this.state.idcard,
      "us_bank_number":this.state.bankcard,
      "us_bank":this.state.bankname,
      "us_bank_addr":this.state.address,
      "us_nickname":this.state.name,
    }
    const result =await User.userIn({data:data});
    if(result.code===1){
      Toast.success('保存成功!',1,await function(){
        dispatch(routerRedux.push('/mine'))
      });
    }else{
      Toast.offline(result.msg,1);
    }
  }
  render(){
    // 顶部title参数
    const Titles = {
      tit: "上传资料",
      lbgimg:'url(' + left + ')',
    }
    const {fontimg}=this.state;
    const {backimg}=this.state;
    return (
      <div className={styles.App}>
          <style>{`
              .am-list-item{
                height:1rem;
                align-items:center;

              }
              .am-list-item.am-list-item-middle .am-list-line{
                padding-right:.3rem;
                position:relative;
              }
              .am-list-item .am-list-line .am-list-content{
                flex:none;
                width:30%;
                font-size:.3rem;
                color:#959595;
                letter-spacing:.01rem;
              }
              .am-list-item .am-list-line .am-list-extra{
                flex:none;
                width:70%;
                font-size:.3rem;
                color:#959595;
                text-align:center;
                height:.73rem;
                border-radius:.1rem;
                border: solid .02rem #cacaca;
                padding: 0 .3rem;
                line-height:.73rem;
              }
              .am-list-item.am-input-item{
                height:1.2rem;
                padding:0;
              }
              .am-list-item .am-input-control input{
                width:100%;
                color:#070707;
              }
              html:not([data-scale]) .am-list-body::after,html:not([data-scale]) .am-list-body::before,html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line::after{
                content:"";
                height:0;
              }
              .am-list-item .am-input-clear{
                position:absolute;
                top:50%;
                right:.5rem;
                transform:translateY(-50%);
                overflow:initial;
                box-sizing:border-box;
              }
              .am-list-item .am-input-label{
                color:#959595;
                font-size:.3rem;
                margin:0;
              }
              .am-list-item .am-input-label.am-input-label-5{
                width:28%;
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
          <Title { ...Titles} leftFunc={ this.returnGoBack }/>
          <div className={styles.main} ref="box">
            <div className={styles.idcard}>
              <p>身份证正面</p>
                <label className={styles.imgbox} htmlFor="imgbox" style={{background:`url(${add}) center no-repeat`,backgroundSize:'10%'}}>
                  <input type="file" onChange={this.getFontimg.bind(this)} accept="image/*" id="imgbox"/>
                  <img src={fontimg!==""?APIHost+fontimg:""} alt=""/>
                </label>
            </div>
            <div className={styles.idcard}>
              <p>身份证背面</p>
              <label className={styles.imgbox} htmlFor="imgbox2" style={{background:`url(${add}) center no-repeat`,backgroundSize:'10%'}}>
                <input type="file" onChange={this.getBackimg.bind(this)} accept="image/*" id="imgbox2"/>
                <img src={backimg!==""?APIHost+backimg:""} alt=""/>
              </label>
            </div>
            <List>
                <InputItem
                  ref="idcard"
                  maxLength='18'
                  clear
                  value={this.state.idcard}
                  onChange={(val)=>this.imputIdcard(val)}
                ><div>身份证号码</div></InputItem>
                <InputItem
                  ref="name"
                  maxLength='10'
                  clear
                  value={this.state.name}
                  onChange={(val)=>this.imputName(val)}
                ><div>真实姓名</div></InputItem>
                <InputItem
                  ref="bankcard"
                  maxLength='23'
                  clear
                  value={this.state.bankcard}
                  type="bankCard"
                  onFocus={()=>this.setState({
                    bank:1
                  })}
                  onBlur={()=>this.setState({
                    bank:0
                  })}
                  onChange={(val)=>this.imputBankcard(val)}
                ><div>银行卡号</div></InputItem>
                <p style={{color:'red',paddingLeft:'28%',display:this.state.bank===1?'block':'none'}}>仅支持中、农、工、建银行</p>
                <InputItem
                  ref="idcard"
                  maxLength='10'
                  clear
                  value={this.state.bankname}
                  onChange={(val)=>this.imputBank(val)}
                  onFocus={()=>this.setState({
                    bank:1
                  })}
                  onBlur={()=>this.setState({
                    bank:0
                  })}
                ><div>银行名称</div></InputItem>
                <InputItem
                  ref="name"
                  maxLength='30'
                  clear
                  value={this.state.address}
                  onFocus={()=>this.setState({
                    addre:1
                  })}
                  onBlur={()=>this.setState({
                    addre:0
                  })}
                  onChange={(val)=>this.imputAddress(val)}
                ><div>开户行地址</div></InputItem>
                <p style={{color:'red',paddingLeft:'28%',display:this.state.addre===1?'block':'none'}}>请填写详细的开户行地址，如果地址不详，影响提现不能到账的，后果自负</p>
            </List>
          </div>
          <div className={styles.menus} onClick={()=>this.Determine()}>确定</div>
      </div>
    )

  }
}





