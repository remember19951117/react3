import * as fetchs from '../utils/fetch';
// 获取购物车列表
export async function shopcarlist(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/cart/index",fetchs.getAuth("/index/cart/index"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//删除购物车商品
export async function dellShop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/del/allDel",fetchs.getAuth("/index/del/allDel"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//添加购物车
export async function addShop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/add",fetchs.getAuth("/index/cart/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//热门推荐
export async function  Recommend() {
  return fetchs.read(fetchs.APIHost+"/index/index/refers").then(response => response.json())
    .then(json => {return json});
}
//购物车数据更新
export async function updateStore(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/edit",fetchs.getAuth("/index/cart/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车结算
export async function submitState(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/closelist",fetchs.getAuth("/index/cart/closelist"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//获取订单商品列表
export async function obtainOrder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/orderdetail",fetchs.getAuth("/index/order/orderdetail"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//微信支付接口
export async function Payorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/pay",fetchs.getAuth("/index/order/pay"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//消费币支付
export async function Paysale(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/payByBi",fetchs.getAuth("/index/order/payByBi"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//H5支付
export async function H5pay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/wehpay",fetchs.getAuth("/index/order/wehpay"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//支付宝支付
export async function aliPay(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/alipay",fetchs.getAuth("/index/order/alipay"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}




