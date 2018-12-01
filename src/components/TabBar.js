import React from 'react';
import PropTypes from 'prop-types';
import styles from "./style/tabBar.css";
import Tab4 from "../assets/icon-img/Tab4.png";
import Tab41 from "../assets/icon-img/Tab41.png"
import Tab2 from "../assets/icon-img/Tab2.png";
import Tab21 from "../assets/icon-img/Tab21.png"
import Tab3 from "../assets/icon-img/Tab3.png";
import Tab31 from "../assets/icon-img/Tab31.png"
import Tab1 from "../assets/icon-img/Tab1.png";
import Tab11 from "../assets/icon-img/Tab11.png";
import Tab5 from "../assets/icon-img/Tab5.png";
import Tab51 from "../assets/icon-img/Tab51.png";

const MyTabBar=({PopoverVisible,selectedTabBar,chgPopoverVisible,history}) =>{
  return(
    <div className={styles.tabBarAll}>
          <div className={styles.tabBarItem} onClick={()=>history.push('/')}>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='home'?Tab11:Tab1}></img>
              <span className={selectedTabBar=='home'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>首页</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/shopcar')}>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='cart'?Tab31:Tab3}></img>
              <span className={selectedTabBar=='cart'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>购物车</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/rash')}>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='rash'?Tab21:Tab2}></img>
              <span className={selectedTabBar=='rash'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>代理抢购</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/order')}>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='order'?Tab41:Tab4}></img>
              <span className={selectedTabBar=='order'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>订单信息</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/mine')}>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='mine'?Tab51:Tab5}></img>
              <span className={selectedTabBar=='mine'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>个人中心</span>
            </div>
          </div>
	  </div>
  )
}

export default MyTabBar
