import React ,{Component} from 'react';
import styles from "./style/Title.less";
export default class Title extends Component{
  render() {
      return (
        <div className={styles.box}>
          <div style={{backgroundImage:this.props.lbgimg}} onClick={this.props.leftFunc}></div>
          <h2 style={{color:'#fff'}}>{this.props.tit}</h2>
          <div style={{backgroundImage:this.props.rbgimg}}></div>
        </div>
      )
  }
}
