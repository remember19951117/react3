import React ,{Component} from 'react';
import * as Goods from "../services/goods";
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost,loggedIn} from "../utils/fetch";


import styles from "./style/shopcarbar.less";
import icon01 from '../assets/icon-img/edit.png';
import icon02 from '../assets/icon-img/delete.png';
import icon03 from '../assets/icon-img/no-select.png';
import icon04 from '../assets/icon-img/select.png';
import add from '../assets/icon-img/add.png';
import reduce from '../assets/icon-img/reduce.png';
export default class Shopcarbar extends Component{
  state = {
    editStatus: true,
  }
  componentDidMount(){
    const { editStatus } = this.props;
    this.setState({editStatus: editStatus})
  }
  EditStatus(){
    this.setState({editStatus: !this.state.editStatus})
  }

  render() {
    //左箭头
    const leftitem={
      backgroundImage: 'url(' + reduce + ')'
    }
    //右箭头
    const rightitem={
      backgroundImage: 'url(' + add + ')'
    }
    const { data, index} = this.props;
    const {menu}=this.props;
      return (
        <div className={styles.box}>
          <style>{`
              .text_hidden2{
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp:3;
                -webkit-box-orient: vertical;
                font-size:.25rem;
                color:#999999;
                line-height:.4rem;
              }
          `}</style>
          <div className={styles.main} style={{display:this.state.editStatus?"flex":"none"}}>
            <div className={styles.select}>
              <img src={data.imgStatus?icon04:icon03} onClick={this.props.updateImgStatus.bind(this, this.props.data,this.props.index)}/>
            </div>
            <div className={styles.content}>
              <div className={styles.imgbox} onClick={this.props.shopInfo.bind(this,this.props.data,this.props.index)}>
                <img src={APIHost+data.pd_pic[0]} alt=""/>
              </div>
              <div className={styles.shopinfo}>
                <div className={styles.menu} style={{display:this.state.editStatus?"flex":"none"}}>
                  <img src={icon02} alt="" onClick={this.props.dell.bind(this,this.props.data,this.props.index)}/>
                  <img src={icon01} alt="" onClick={this.EditStatus.bind(this)}/>
                </div>
                <h2 style={{color:'#070707'}}>{data.pd_name}</h2>
                <p className='text_hidden2'>{data.pd_content}</p>
                <div className={styles.coninfo}>
                  <span style={{color:'#ff6d00'}}>￥{data.pd_price}</span>
                  <span>x{data.pd_num}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main} style={{display:this.state.editStatus?"none":"flex"}}>
            <div className={styles.select}>
              <img src={data.imgStatus?icon04:icon03} onClick={this.props.updateImgStatus.bind(this, this.props.data,this.props.index)}/>
            </div>
            <div className={styles.conedit}>
              <div className={styles.imgbox} onClick={this.props.shopInfo.bind(this,this.props.data,this.props.index)}>
                <img src={APIHost+data.pd_pic[0]} alt=""/>
              </div>
              <div className={styles.shopinfo}>
                <h2 style={{color:'#070707'}} style={{width:'3.2rem',overflow:'hidden',textOverflow:'ellipsis',lineHeight:'.4rem'}}>{data.pd_name}</h2>
                <div className={styles.stepper}>
                  <span onClick={this.props.reduce.bind(this, this.props.data,this.props.index)} style={leftitem}></span>
                  <span>{data.pd_num}</span>
                  <span onClick={this.props.add.bind(this, this.props.data,this.props.index)} style={rightitem}></span>
                </div>
              </div>
            </div>
            <div className={styles.menus} onClick={this.props.updateEditStatus.bind(this,this.props.data,this.props.index)}><span>确<br/>定</span></div>
          </div>
        </div>
      )
  }
}
