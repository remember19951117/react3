import React,{Component} from 'react';
import {connect} from 'dva';
import {APIHost,loggedIn} from "../utils/fetch";
import { routerRedux} from 'dva/router';
import * as Home from "../services/home";
import {Carousel ,Grid,List,Modal} from 'antd-mobile';
import styles from './style/IndexPage.less';
import MyTabBar from "../components/TabBar";
import news from '../assets/icon-img/news.png';
import shop from '../assets/icon-img/shopcar.png';
import clear from '../assets/icon-img/clear.png';
import search from '../assets/icon-img/search.png';
import icon from '../assets/icon-img/icon.png';
@connect(state => ({
  home: state.home
}))
export default class Index extends Component {
  state={
    value:"",
    place:0,
    selectedTabBar:'home',
    cates:[],
    fireshop:[],
    firenew:[],
    Carousel:[],
    val:"",
    newslist:[],
    modal1:false
  }
  componentWillMount(){
    const { dispatch } = this.props;
    const user = loggedIn();
    if(!user){
        dispatch(routerRedux.push({pathname: '/login'}));
    }
}
  // 输入框清除
  clear = () => {
    this.setState({ value: '',place:0});
  };
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  // 输入框点击
  handleClick = () => {
    this.refs.search.focus();
    if(this.state.value!==""){
      this.setState({ place:1})
    }
  }
  //输入框数据改变
  onChange=(e)=>{
    if(e.target.value.length<=0){
      this.setState({
        place:0
      })
    }else{
      this.setState({
        place:1
      })
    }
    this.setState({ value:e.target.value });
  }
  componentDidMount(){
    const { home } = this.props;
    const data=home.Indexinfo;
    const newcates=this.state.cates;
    if(home.Indexinfo.cates){
      data.cates.map((item)=>(
        newcates.push({
          icon:APIHost+item.ca_pic,
          text:item.ca_name,
          id:item.id,
        })
      ))
      this.setState({
        cates:newcates,
        Carousel:data.shuffling,
        fireshop:data.hots.data,
        firenew:data.news.data,
        value:home.Indexinfo.word,
        discount:home.Indexinfo.discount,
        newslist:home.Indexinfo.newslist
      })
    }
  }
  componentWillReceiveProps(nextProps){
    const { home } = nextProps;
    const data=home.Indexinfo;
    const newcates=this.state.cates;
    if(newcates.length===0){
      data.cates.map((item)=>(
        newcates.push({
          icon:APIHost+item.ca_pic,
          text:item.ca_name,
          id:item.id,
        })
      ))
      this.setState({
        cates:newcates,
        Carousel:data.shuffling,
        fireshop:data.hots.data,
        firenew:data.news.data,
        value:home.Indexinfo.word,
        discount:home.Indexinfo.discount,
        newslist:home.Indexinfo.newslist
      })
    }
    if(home.Status===1){
      this.setState({
        modal1:true
      })
    }
  }
  //搜索商品
  async search(){
    const {dispatch}=this.props;
    let val=this.state.value;
    if(val!==""){
      dispatch(routerRedux.push('/levelshop?pd_name='+val));
    }
  }
  //分类跳转
  async classify(el,index){
    const {dispatch}=this.props;
    let id=el.id;
    dispatch(routerRedux.push('/levelshop?ca_id='+id));
  }
  //商品详情
  shopClick(val){
    const {dispatch}=this.props;
    if(val!==""){
      dispatch(routerRedux.push('/shopinfo?id='+val));
    }
  }
  //新闻详情
  newslist(val){
    const {dispatch}=this.props;
    dispatch(routerRedux.push('/newsinfo?id='+val));
  }
  //关闭弹窗
  close(){
    this.setState({
      // modal1:false
    })
  }
  //更新弹窗
  async update(){
    const value =await Home.closeStatus({});
    if(value.code===1){
      this.setState({
        modal1:false
      })
      window.location="https://www.slmy10000.com/down";
    }
  }
  render(){
    const {history,home}=this.props;
    const {cates,newslist}=this.state;
    // 传入tabBar参数
    const tabBarProps={
      selectedTabBar:this.state.selectedTabBar,
      history
    }
    const lbgi={
      backgroundImage: 'url(' + shop + ')',
    }
    const rbgi={
      backgroundImage: 'url(' + news + ')',
    }
    const Item = List.Item;
    return (
      <div className={styles.App}>
          <style>{`
            .am-list{
              transform: translateY(-.14rem);
            }
            .am-list-body,.am-list-item{
              background-color:#f2f3ec;
            }
            html:not([data-scale]) .am-list-body::before,html:not([data-scale]) .am-list-body::after{
              content:"";
              height:0;
            }
            .am-list-item{
              min-height:auto;
            }
            .am-list-item .am-list-line .am-list-extra{
              color:#0973ea;
            }
            .am-list-item .am-list-line .am-list-content{
              font-size:.28rem;
            }
            .am-list-item .am-list-line .am-list-extra{
              font-size:.28rem;
            }
            .am-list-item img{
              width:.3rem;
              height:.3rem;
            }
            .am-list-item .am-list-thumb:first-child{
              margin-right:.15rem;
            }
            .am-grid{
              width: 95%;
              background-color: #fff;
              border-radius: .1rem;
              height:2.1rem;
              transform: translateY(-.28rem);
              margin:0 auto;
              overflow:hidden;
              padding:.2rem 0;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content{
              justify-content:stretch;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content .am-grid-text{
              font-size:.3rem;
              color:#070707;
              line-height:.5rem;
              margin:0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .am-grid .am-flexbox .am-flexbox-item {
              max-height:3.5rem;
              min-height:1.5rem;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content{
              padding:.05rem 0 0;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content .am-grid-icon {
              width:.76rem !important;
              height:.76rem;
              overflow:hidden;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content .am-grid-icon img{
              width:100%;
            }
            .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content .am-grid-text{
              width:100%;
              overflow:hidden;
            }
            .am-carousel-wrap{
              position:absolute;
              bottom:-.35rem;
            }
            .am-carousel .slider-list{
              height:50vw !important;
            }
            .am-grid .slider-list{
              height:auto !important;
            }
            .am-modal-title{
              line-height:.8rem;
              color:red;
            }
          `}</style>
          {/* 页面title */}
          <div className={styles.title}>
            <div className={styles.shopcaricon} style ={lbgi}></div>
            <div className={styles.search}>
              <div className={styles.searchicon} onClick={()=>this.search()}>
                <img src={search} alt="" style={{width:'100%'}}/>
              </div>
              <div className={styles.searchclear} onClick={()=>this.clear()} style={{display:this.state.place===1?"block":"none"}}>
                <img src={clear} alt="" style={{width:'100%',height:'100%'}}/>
              </div>
                <form className={styles.forminfo} onSubmit={()=>this.search()}>
                  <input type="search" onChange={(e)=>this.onChange(e)} maxLength="16" onClick={()=>this.handleClick()} ref="search" value={this.state.place===0?"":this.state.value} onKeyPress={(e)=>this.press(e)}/>
                </form>
                <div className={styles.placeholder} style={{display:this.state.place===1?"none":"inline-block"}} onClick={()=>this.handleClick()}>{this.state.value!==""?this.state.value:"请输入想要的商品"}</div>
            </div>
            <div className={styles.newsicon} style={rbgi}></div>
          </div>
          {/* 页面主体 */}
        <div className={styles.main}>
          {/* 展示轮播图 */}
          <div className={styles.showinfo}>
              <Carousel
                autoplay={true}
                infinite
                dots={false}
                >
                {
                  this.state.Carousel.map(function(item, index){
                    return(
                      <div key={index} style={{ display: 'inline-block', width: '100%',height: '50vw' }}>
                        <img
                          src={APIHost+item}
                          alt=""
                          style={{ width: '100%', verticalAlign: 'top', height: '50vw'  }}
                          onLoad={() => {}}
                        />
                      </div>
                    )
                  })
                }
              </Carousel>
          </div>
          {/* 十宫格按钮菜单 */}
            <Grid data={cates}
              columnNum={5}
              hasLine={false}
              isCarousel
              onClick={(el,index) =>this.classify(el,index)}
              />
          {/* {新闻公告} */}
          <List className="my-list">
            <Item extra={'更多>>'} thumb={icon} onClick={()=>history.push('/newslist')}>新闻公告</Item>
          </List>
          <div className={styles.news}>
            {
            newslist.length>0?newslist.map((list)=>(
            <div className={styles.boxnew} key={list.id} onClick={()=>this.newslist(list.id)}>
              <p>{list.title}</p>
              <p>{list.add_time}</p>
            </div>
            )):""
            }
          </div>
          {/* 商品类别 */}
          <div className={styles.category}>
            {/* 热门商品 */}
            <div className={styles.fireshop}>
              <h2>热销商品</h2>
              <div className={styles.flex}>
                {
                  home.Indexinfo.hots?home.Indexinfo.hots.data.map((shop,index)=>(
                      <div className={styles.flexItem} key={shop.id} onClick={()=>this.shopClick(shop.id)}>
                        <div className={styles.itemimg}>
                          <img src={APIHost+shop.pd_pic[0]} alt=""/>
                        </div>
                        <div className={styles.iteminfo}>
                          <p>{shop.pd_name}</p>
                          <p>
                            <span>￥{shop.pd_price}</span>
                            <span>{shop.pd_inventory}人已付款</span>
                          </p>
                        </div>
                      </div>
                  )):""
                }
              </div>
            </div>
            {/* 热门新品 */}
            <div className={styles.firenews}>
              <h2>即将上市</h2>
              <div className={styles.flex}>
                <div className={styles.flexleft}>
                  {
                    this.state.firenew.map((shop,index)=>{
                      if(index>0){
                        return
                      }
                      return(
                        <div className={styles.con} key={shop.id} onClick={()=>this.shopClick(shop.id)}>
                          <div className={styles.shopimg} >
                            <img src={APIHost+shop.pd_pic[0]} alt=""/>
                          </div>
                          <h2>{shop.pd_name}</h2>
                          <p>
                            <span>￥{shop.pd_price}</span>
                            <span>{shop.pd_sales}人已付款</span>
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.flexright}>
                  {
                    this.state.firenew.map((shop,index)=>{
                      if(index<1 ||index>2){
                        return;
                      }
                      return(
                        <div className={styles.itemlist} key={shop.id} style={{background:`url(${APIHost+shop.pd_pic}) center no-repeat`,backgroundSize:'contain'}} onClick={()=>this.shopClick(shop.id)}>
                          <div className={styles.content}>
                            <p>{shop.pd_name}</p>
                            <p>￥{shop.pd_price}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* 底部导航 */}
          <MyTabBar  {...tabBarProps}/>
          <Modal
            visible={this.state.modal1}
            transparent
            maskClosable={false}
            title="丝霖蔓雨App有重大更新,不更新将有部分功能无法使用!!!!"
            footer={[
              { text: '下次更新',onPress:()=>this.close() },
              { text: '立即更新', onPress:()=>this.update() },
            ]}
            >
        </Modal>
      </div>
    )
  }
}
