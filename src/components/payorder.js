import React ,{Component} from 'react';
import styles from "./style/payorder.less";
import {APIHost} from "../utils/fetch";
export default class Payorder extends Component{
  render() {
    const { data} = this.props;
      return (
          <div className={styles.box}>
              <style>{`
                .text_hidden2{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp:3;
                  -webkit-box-orient: vertical;
                  line-height:.4rem;
                }
            `}</style>
            <div className={styles.content}>
              <div className={styles.imgbox}>
                <img src={APIHost+data.or_pd_pic[0]} alt=""/>
              </div>
              <div className={styles.con}>
                <h2 style={{color:'#070707'}}>{data.or_pd_name}</h2>
                <p className='text_hidden2'>{data.or_pd_content}</p>
                <div className={styles.conprice}>
                  <span style={{color:'#ff6d00'}}>￥{data.or_pd_price}</span>
                  <span>x{data.or_pd_num}</span>
                </div>
              </div>
            </div>
          </div>
      )
  }
}
