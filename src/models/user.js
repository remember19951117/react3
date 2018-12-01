import * as user from "../services/user";
import {  Toast } from 'antd-mobile';
const queryString = require('query-string');
export default {
  namespace: 'user',
  state:{
    userInfo:{}, //用户信息
    Typelist:[],//代理商分类列表
    teamList:[], //团队列表
    userprofit:{},//收益信息
    profitList:[],//收益列表
    Paylist:[],  //提现记录
    addressList:[],//地址列表
    addressInfo:{},//地址信息
    payInfo:"",   //提现信息
    Orderlist:[], //订单列表
    shopInfo:{},  //商品详情
    Recommen:{},//推荐人
    loadMore:false,//订单是否加载更多
    Load:false,//抢购是否加载更多
    rashList:[],//抢购列表
    rashRecord:[],//抢购记录
    shopdetails:{},//抢购商品详情
    RashInfo:{},//抢购商品资料
    myorderList:[],//用户订单列表
    pagination: {
      page:1,                  // 页数
      total: 0                  // 总数
    },
    pageinfo: {
      page:1,                  // 页数
      total: 0                  // 总数
    },
    imgurl:"",//二维码图片路径
    qrList:[],//二维码列表
    accountList:[],//账户管理列表
    qrcodeList:[],//下级扫码列表
  },

  subscriptions: {
    setup({ dispatch, history ,location}) {  // eslint-disable-line
      history.listen(location=>{
        if(location.pathname === '/mine'){
          dispatch({
              type: 'userIn',
              payload:""
          })
        }else if(location.pathname ==='/rash'){
          dispatch({
            type: 'userRash',
            payload:""
          })
        }else if(location.pathname ==='/rashlist'){
          dispatch({
            type: 'userRashlist',
            payload:{
              status:100
            }
          })
        }else if(location.pathname ==='/rashshop'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            dispatch({
              type: 'rashopInfo',
              payload:{
                pd_id:parsed.id
              }
            })
          }
        }else if(location.pathname ==='/rashagent'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.id){
              dispatch({
                type: 'userRashshop',
                payload:{
                  pd_id:parsed.id
                }
              })
            }
          }
        }else if(location.pathname === '/mineteam'){
          dispatch({
            type: 'team',
            payload:""
          })
        }else if(location.pathname === '/address'){
          dispatch({
            type: 'address',
            payload:""
          })
        }else if(location.pathname === '/profit'){
          dispatch({
            type: 'profit',
            payload:""
          })
        }else if(location.pathname === '/addsite'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.id){
              dispatch({
                type: 'editsite',
                payload:parsed
              })
            }
          }else{
            dispatch({
              type: 'null',
              payload:""
            })
          }
        }else if(location.pathname === '/mineinfo'){
          dispatch({
            type: 'mine',
            payload:""
          })
        }else if(location.pathname === '/info'){
          dispatch({
            type: 'mine',
            payload:""
          })
        }else if(location.pathname === '/userinfo'){
          dispatch({
            type: 'mine',
            payload:""
          })
        }else if(location.pathname === '/paylist'){
          dispatch({
            type: 'pay',
            payload:{
              tx_status:""
            }
          })
        }else if(location.pathname ==='/putforward'){
          dispatch({
            type: 'payinfo',
            payload:""
          })
        }else if(location.pathname ==='/order'){
            dispatch({
              type: 'order',
              payload:{
                or_status:""
              }
            })
        }else if(location.pathname ==='/myorder'){
          dispatch({
            type: 'my_order',
            payload:""
          })
        }else if(location.pathname ==='/agent'){
          dispatch({
            type: 'userInfo',
            payload:""
          })
        }else if(location.pathname ==='/account'){
          dispatch({
            type: 'Account',
            payload:""
          })
        }else if(location.pathname ==='/addfriend'){
          if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.id){
              dispatch({
                type: 'imgurl',
                payload:{
                  pic:parsed.id
                }
              })
            }
          }
        }else if(location.pathname ==='/register'){
          if(location.search!==""){
            const parsed=location.search.replace("?","").slice(7,)
              if(parsed){
                dispatch({
                  type: 'regis',
                  payload:{
                    qrcode:parsed
                  }
              })
              }
            }
        }
      })
    },
  },

  effects: {
    *userRash({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.RashList,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'rashlist',
          payload: {
            rashList:data.data.data,
            pageinfo: {
              page: payload.page?payload.page:1,                  // 页数
              total: data.data.total
            }
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *Account({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.Account,payload);
      Toast.hide();
      if (data.code ===1) {
        yield put({
          type: 'count',
          payload: {
            qrList:data.data.mine,
            accountList:data.data.line,
            qrcodeList:data.data.team
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *rashopInfo({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.shopInfo,payload);
      Toast.hide();
      if (data.code ===1) {
        yield put({
          type: 'shop',
          payload: {
            shopdetails:data.data,
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *userRashshop({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.RashInfo,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'rashInfo',
          payload:{
            RashInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *imgurl({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.imgUrl,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'qrurl',
          payload:{
            imgurl:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *my_order({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.Myorder,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'myorder',
          payload:{
            myorderList:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *userRashlist({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.rashRecord,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'Recordlist',
          payload:{
            rashRecord:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *regis({ payload },{ call, put }){
      Toast.loading("加载中...");
      const data = yield call(user.Recommen,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'recommen',
          payload:{
            Recommen:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *userIn({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.getInfo,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'getUser',
          payload:{
            userInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *mine({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.getInfo,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'getUser',
          payload:{
            userInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *team({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.myTeam,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'teamlist',
          payload:{
            teamList:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *address({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.Address,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'address_add',
          payload:{
            addressList:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *editsite({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.changeSite,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'address',
          payload:{
            addressInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *pay({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.Paylist,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'paylist',
          payload:{
            Paylist:data.data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *payinfo({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.PayInfo,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'payin',
          payload:{
            payInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    *order({ payload }, {call, put}){
      Toast.loading("加载中...");
      const value = yield call(user.Orderlist,payload);
      Toast.hide()
      if(value.code===1){
        yield put({
          type: 'ordersave',
          payload:{
            Orderlist:value.data.data,
            pagination: {
              page: payload.page?payload.page:1,                  // 页数
              total: value.data.total
            }
          }
        })
      }else{
        Toast.fail(value.msg, 2);
      }
    },
    *userInfo({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data = yield call(user.UserInfo,payload);
      const value = yield call(user.Typelist,payload);
      Toast.hide()
      if(data.code===1){
        yield put({
          type: 'getUser',
          payload:{
            userInfo:data.data
          }
        })
      }else{
        Toast.fail(data.msg, 2);
      }
      if(value.code===1){
        yield put({
          type: 'types',
          payload:{
            Typelist:value.data
          }
        })
      }
    },
    *profit({ payload }, {call, put}){
      Toast.loading("加载中...");
      const data1 = yield call(user.ProfitList,payload);
      const data2 = yield call(user.ProfitInfo,payload);
      Toast.hide()
      if(data1.code===1){
        yield put({
          type: 'profitlist',
          payload:{
            profitList:data1.data
          }
        })
      }else{
        Toast.fail(data1.msg, 2);
      }
      if(data2.code===1){
        yield put({
          type: 'profitinfo',
          payload:{
            userprofit:data2.data
          }
        })
      }else{
        Toast.fail(data2.msg, 2);
      }
    },
  },

  reducers: {
    getUser(state, action) {
      const { userInfo} = action.payload;
      return { ...state, userInfo};
    },
    count(state, action){
      const { qrList,accountList,qrcodeList} = action.payload;
      return { ...state, qrList,accountList,qrcodeList};
    },
    types(state, action){
      const {Typelist} = action.payload;
      return { ...state,Typelist};
    },
    teamlist(state, action){
      const { teamList } = action.payload;
      return { ...state, teamList};
    },
    profitinfo(state, action){
      const { userprofit} = action.payload;
      return { ...state, userprofit};
    },
    qrurl(state, action){
      const { imgurl} = action.payload;
      return { ...state, imgurl};
    },
    shopIn(state, action){
      const { shopInfo} = action.payload;
      return { ...state, shopInfo};
    },
    profitlist(state, action){
      const { profitList} = action.payload;
      return { ...state, profitList};
    },
    address_add(state, action){
      const { addressList} = action.payload;
      return { ...state, addressList};
    },
    editsite(state, action){
      const { addressList} = action.payload;
      return { ...state, addressList};
    },
    address(state, action){
      const { addressInfo} = action.payload;
      return { ...state, addressInfo};
    },
    paylist(state, action){
      const { Paylist} = action.payload;
      return { ...state, Paylist};
    },
    payin(state, action){
      const { payInfo} = action.payload;
      return { ...state, payInfo};
    },
    H5pay(state, action){
      const { wechaturl} = action.payload;
      return { ...state, wechaturl};
    },
    myorder(state, action){
      const { myorderList} = action.payload;
      return { ...state, myorderList};
    },
    ordersave(state, action){
      const { Orderlist, pagination} = action.payload;
      if(pagination.total<=10){
        return { ...state,
          Orderlist,
          pagination,
          loadMore: false,
        }
      }else{
        if(pagination.page===1){
          return { ...state,
            Orderlist,
            pagination,
            loadMore: true,
          }
        }else{
          var newshop = Orderlist;
          if(newshop.length>0){
            const Orderlist = state.Orderlist.concat(newshop);
            if(Orderlist.length < pagination.total){
              return { ...state,
                Orderlist,
                pagination,
                loadMore: true,
              }
            }else{
              return { ...state,
                Orderlist,
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
    cancelOrder(state, action){
      const {index} = action.payload;
      var Orderlist = state.Orderlist;
      Orderlist.splice(index,1);
      return { ...state,
        Orderlist,
      }
    },
    dellAddress(state, action){
      const {index} = action.payload;
      var addressList = state.addressList;
      addressList.splice(index,1);
      return { ...state,
        addressList,
      }
    },
    recommen(state, action){
      const { Recommen} = action.payload;
      return { ...state, Recommen};
    },
    rashInfo(state, action){
      const { RashInfo} = action.payload;
      return { ...state, RashInfo};
    },
    shop(state, action){
      const { shopdetails } = action.payload;
      return { ...state, shopdetails};
    },
    Recordlist(state, action){
      const { rashRecord} = action.payload;
      return { ...state, rashRecord};
    },
    rashlist(state, action){
      const { rashList, pageinfo} = action.payload;
      if(pageinfo.total<=10){
        return { ...state,
          rashList,
          pageinfo,
          Load: false,
        }
      }else{
        if(pageinfo.page===1){
          return { ...state,
            rashList,
            pageinfo,
            Load: true,
          }
        }else{
          var newshop = rashList;
          if(newshop.length>0){
            const rashList = state.rashList.concat(newshop);
            if(rashList.length < pageinfo.total){
              return { ...state,
                rashList,
                pageinfo,
                Load: true,
              }
            }else{
              return { ...state,
                rashList,
                pageinfo,
                Load: false,
              }
            }
          }else{
            return { ...state,
              Load: false,
            }
          }
        }
      }
    }
  },
};
