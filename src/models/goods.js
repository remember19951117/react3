import * as goods from "../services/goods";
import {  Toast } from 'antd-mobile';
const queryString = require('query-string');
export default {
  namespace: 'goods',
  state: {
    shopcarList:[], //购物车列表
    Recommendlist:[],//推荐列表
    shopSecInfo:{}, //选中的数据
    shopSecList:[],//选中商品列表
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location=>{
        if(location.pathname === '/shopcar'){
          dispatch({
            type: 'shopcar',
            payload:""
          })
        }else if(location.pathname === '/shoppay'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
              dispatch({
                type: 'obtain',
                payload:{
                  or_id:parsed.id
                }
              })
          }
        }
      })
    },
  },


  effects: {
    *shopcar({ payload }, { call, put }) {  // eslint-disable-line
      Toast.loading("加载中...");
      const data = yield call(goods.shopcarlist,payload);
      Toast.hide()
      if(data.code===1){
        var sendData = data.data;
        sendData.map(function(item){
          item.imgStatus = false;
        })
        yield put({
          type: 'save',
          payload:{
            shopcarList:sendData
          }
        })
      }
    },
    *selectShopCarItem({payload},{call, put}){
      yield put({
        type: 'selectShopCarItemStateSuccess',
        payload: payload
      })
    },
    *updateShopCarAllSelectState({payload},{call, put}){
      yield put({
        type: 'updateShopCarAllSelectStateSuccess',
        payload: payload
      })
    },
    *updateShopCarItem({payload},{call, put}){
      yield put({
        type: 'updateShopCarItemSuccess',
        payload: payload
      })
    },
    *shopinfo({payload},{call, put}){
      yield put({
        type: 'storeGoodsInfo',
        payload: {shopSecInfo:payload}
      })
    },
    *obtain({payload},{call, put}){
      Toast.loading("加载中...");
      const data = yield goods.obtainOrder(payload);
      const data2 = yield call(goods.Recommend,payload);
      if(data.code===1){
        yield put({
          type: 'storeBuyGoodsList',
          payload:{
            shopSecList:data.data
          }
        })
      }
      if(data2.code===1){
        yield put({
          type: 'fire',
          payload:{
            Recommendlist:data2.data.data
          }
        })
      }
    }
  },

  reducers: {
    save(state, action) {
      const { shopcarList} = action.payload;
      return { ...state, shopcarList};
    },
    updateShopCarAllSelectStateSuccess(state, action){
      const { status } = action.payload;
      var shopcarList = state.shopcarList;
      shopcarList.map(function(item){
        item.imgStatus = status;
      })
      return { ...state,
        shopcarList,
      }
    },
    selectShopCarItemStateSuccess(state, action) {
      const { status, index} = action.payload;
      var shopcarList = state.shopcarList;
      var shopItem = shopcarList[index];
      shopItem.imgStatus = status;
      shopcarList.splice(index,1,shopItem);
      return { ...state,
        shopcarList,
      }
    },
    updateShopCarItemSuccess(state, action) {
      const { number, index} = action.payload;
      var shopcarList = state.shopcarList;
      var shopItem = shopcarList[index];
      shopItem.pd_num = shopItem.pd_num+number;
      shopcarList.splice(index,1,shopItem);
      return { ...state,
        shopcarList,
      }
    },
    fire(state, action){
      const { Recommendlist} = action.payload;
      return { ...state, Recommendlist};
    },
    storeGoodsInfo(state, action){
      const { shopSecInfo} = action.payload;
      return { ...state, shopSecInfo};
    },
    storeBuyGoodsList(state, action){
      const { shopSecList} = action.payload;
      return { ...state, shopSecList};
    },
    H5pay(state, action){
      const { wechaturl} = action.payload;
      return { ...state, wechaturl};
    },
    dellShop(state, action){
      const {index} = action.payload;
      var shopcarList = state.shopcarList;
      shopcarList.splice(index,1);
      return { ...state,
        shopcarList,
      }
    }
  },

};
