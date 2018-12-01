import * as home from "../services/home";
import {  Toast } from 'antd-mobile';
const queryString = require('query-string');

export default {
  namespace: 'home',
  state: {
    Indexinfo:{}, //首页信息
    shopList:[],  //搜索商品列表
    Title:"",//标题
    shopdetails:{}, //商品详情
    Recommendlist:[],//热门推荐列表
    loadMore: true,             // 是否加载更多数据
    pagination: {
      page:1,                  // 页数
      total: 0                  // 总数
    },
    newsInfo:{},//新闻详情
    newsList:[],//新闻列表
    Status:""
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location=>{
        if(location.pathname === '/'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.reward){
              dispatch({
                type: 'reward',
                payload:""
              })
            }
          }else{
            dispatch({
              type: 'Index',
              payload:""
            })
          }
        }else if(location.pathname === '/shopinfo'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            dispatch({
              type: 'shopInfo',
              payload:{
                pd_id:parsed.id
              }
            })
          }
        }else if(location.pathname === '/levelshop'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            dispatch({
              type: 'searchshop',
              payload:parsed
            })
          }
        }else if(location.pathname === '/newsinfo'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            dispatch({
              type: 'newsin',
              payload:{
                id:parsed.id
              }
            })
          }
        }else if(location.pathname === '/newslist'){
          dispatch({
            type: 'newsli',
            payload:{}
          })
        }
      })
    },
  },
  effects: {
    *reward({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(home.indexCarousel,payload);
      const data2 = yield call(home.Status,payload);
      Toast.hide();
      if(data.code===1){
        yield put({
          type: 'save',
          payload:{
            Indexinfo:data.data
          }
        })
      }
      if(data2.code===1){
        yield put({
          type: 'status',
          payload:{
            Status:data2.data.code
          }
        })
      }
    },
    *Index({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(home.indexCarousel,payload);
      Toast.hide();
      if(data.code===1){
        yield put({
          type: 'save',
          payload:{
            Indexinfo:data.data
          }
        })
      }else{
        Toast.offline(data.msg,1);
      }
    },
    *newsin({ payload },{ call, put }){
      Toast.loading("加载中...");
        const data = yield call(home.newInfo,payload);
        Toast.hide();
        if(data.code===1){
          yield put({
            type: 'newinfo',
            payload: {
              newsInfo: data.data,
            }
          })
        }else{
          Toast.offline(data.message,1);
        }
    },
    *newsli({ payload },{ call, put }){
      Toast.loading("加载中...");
        const data = yield call(home.newList,payload);
        Toast.hide();
        if(data.code===1){
          yield put({
            type: 'newlist',
            payload: {
              newsList: data.data,
            }
          })
        }else{
          Toast.offline(data.message,1);
        }
    },
    *searchshop ({ payload }, { call, put }) {
        Toast.loading("加载中...");
        const data = yield call(home.searchShop,payload);
        Toast.hide();
        if(data.code===1){
          yield put({
            type: 'queryMyRenewListSuccess',
            payload: {
              shopList: data.data.list.data,
              Title:data.data.ca_name,
              pagination: {
                page: payload.page?payload.page:1,                  // 页数
                total: data.data.list.total
              }
            }
          })
        }else{
          Toast.offline(data.message,1);
        }
    },
    *shopInfo({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(home.shopInfo,payload);
      const data2 = yield call(home.Recommend,payload);
      Toast.hide();
      if (data.code ===1) {
        yield put({
          type: 'shop',
          payload: {
            shopdetails:data.data,
            storeList:""
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
      if(data2.code===1){
        yield put({
          type: 'fire',
          payload:{
            Recommendlist:data2.data.data
          }
        })
      }
    },
  },
  reducers: {
    status(state, action){
      const { Status } = action.payload;
      return { ...state, Status};
    },
    save(state, action) {
      const { Indexinfo } = action.payload;
      return { ...state, Indexinfo};
    },
    shop(state, action){
      const { shopdetails ,storeList} = action.payload;
      return { ...state, shopdetails,storeList};
    },
    fire(state, action){
      const { Recommendlist} = action.payload;
      return { ...state, Recommendlist};
    },
    newinfo(state, action){
      const { newsInfo} = action.payload;
      return { ...state, newsInfo};
    },
    newlist(state, action){
      const { newsList} = action.payload;
      return { ...state, newsList};
    },
    queryMyRenewListSuccess(state, action){
      const { shopList, pagination,Title} = action.payload;
      if(pagination.total<=10){
        return { ...state,
          shopList,
          Title,
          pagination,
          loadMore: false,
        }
      }else{
        if(pagination.page===1){
          return { ...state,
            shopList,
            Title,
            pagination,
            loadMore: true,
          }
        }else{
          var newshop = shopList;
          if(newshop.length>0){
            const shopList = state.shopList.concat(newshop);
            if(shopList.length < pagination.total){
              return { ...state,
                shopList,
                pagination,
                loadMore: true,
              }
            }else{
              return { ...state,
                shopList,
                pagination,
                loadMore: false,
              }
            }
          }else{
            return { ...state,
              loadMore: false,
            }
          }
        }
      }
    },
  },
};
