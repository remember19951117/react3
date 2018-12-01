import React ,{Component} from 'react';
import styles from "./style/Recommend.less";
export default class Recommend extends Component{
  render() {
      return (
        <div className={styles.box}>
          <h2>热门推荐</h2>
          <div className={styles.flex}>
            {
            this.props.fireshop.map((shop)=>
              <div className={styles.flexItem} key={shop.id}>
                <div className={styles.itemimg}></div>
                <div className={styles.iteminfo}>
                  <p>{shop.name}</p>
                  <p>
                    <span>￥{shop.price}</span>
                    <span>{shop.peoplenum}已付款</span>
                  </p>
                </div>
                </div>)
            }
          </div>
        </div>
      )
  }
}
