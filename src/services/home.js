import * as fetchs from '../utils/fetch';

// 首页信息
// 获取轮播图和菜单
export async function  indexCarousel() {
  return fetchs.read(fetchs.APIHost+"/index/index/index").then(response => response.json())
    .then(json => {return json});
}
//获取搜索结果,获取店铺所有商品
export async function searchShop(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/search",params).then(response => response.json())
    .then(json => {return json});
}
//获取商品详情
export async function shopInfo(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/detail",params).then(response => response.json())
    .then(json => {return json});
}
//热门推荐
export async function  Recommend() {
  return fetchs.read(fetchs.APIHost+"/index/index/refers").then(response => response.json())
    .then(json => {return json});
}
//新闻详情
export async function newInfo(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/getNewsByid",params).then(response => response.json())
    .then(json => {return json});
}
//新闻列表
export async function newList(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/allNewsList",params).then(response => response.json())
    .then(json => {return json});
}
//强制更新
export async function Status() {
  return fetchs.creat_Token(fetchs.APIHost+"/index/login/changeAppStatus",fetchs.getAuth("/index/login/changeAppStatus")).then(response => response.json())
  .then(json => {return json});
}
//强制更新
export async function closeStatus() {
  return fetchs.creat_Token(fetchs.APIHost+"/index/login/dochangeAppStatus",fetchs.getAuth("/index/login/dochangeAppStatus")).then(response => response.json())
  .then(json => {return json});
}


