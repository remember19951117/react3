import * as fetchs from '../utils/fetch';

// 登录
export async function  userlogin(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/login/index",fetchs.getAuth("/index/login/index",params.username,params.password),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//注册
export async function  register(params) {
  return fetchs.create(fetchs.APIHost+"/index/every/register",params).then(response => response.json())
    .then(json => {return json});
}
// 修改密码
export async function  changePwd(params) {
  return fetchs.create(fetchs.APIHost+"/index/every/forget",params).then(response => response.json())
    .then(json => {return json});
}
// 外部获取验证码
export async function  getCode(params) {
  return fetchs.create(fetchs.APIHost+"/shop/Every/send",params).then(response => response.json())
    .then(json => {return json});
}
//获取微信相关
export async function Wechat(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/every/check_code",fetchs.getAuth("/index/every/check_code"),JSON.stringify(params)).then(response => response.json())
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
//获取用户信息
export async function UserInfo(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/user/tobeVip",fetchs.getAuth("/index/user/tobeVip"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//个人信息
export async function getInfo(params) {
  return fetchs.read_Token(fetchs.APIHost+"/user/detail",fetchs.getAuth("/user/detail"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//我的团队
export async function myTeam(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/User/myTeam",fetchs.getAuth("/index/User/myTeam"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//收益列表
export async function ProfitList(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/user/shop_record",fetchs.getAuth("/index/user/shop_record"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//收益信息
export async function ProfitInfo(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/user/get_detail",fetchs.getAuth("/index/user/get_detail"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//提现记录
export async function Paylist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/tx_record",fetchs.getAuth("/index/user/tx_record"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//提现信息
export async function PayInfo(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/user/tixian",fetchs.getAuth("/index/user/tixian"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//提现
export async function  Payforward(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/dotixian",fetchs.getAuth("/index/user/dotixian"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//地址列表
export async function Address(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/addr/index",fetchs.getAuth("/index/addr/index"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//添加地址
export async function  addSite(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/add",fetchs.getAuth("/index/addr/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//修改地址
export async function changeSite(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/edit",fetchs.getAuth("/index/addr/edit"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//提交新地址
export async function subAddress(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/doedit",fetchs.getAuth("/index/addr/doedit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//删除地址
export async function dellSite(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Del/allDel",fetchs.getAuth("/index/Del/allDel"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//修改个人信息
export async function editUser(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/edit",fetchs.getAuth("/index/user/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
// 上传图片
export async function  uploadImg(params) {
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/Every/upload",params).then(response => response.json()).then(json => {return json});
}
//订单列表
export async function Orderlist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/index",fetchs.getAuth("/index/order/index"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//商品详情
export async function ShopInfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/detail",fetchs.getAuth("/index/order/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//确认收货
export async function SureInfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/receive",fetchs.getAuth("/index/order/receive"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//加入购物车
export async function addShopcar(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/add",fetchs.getAuth("/index/cart/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//购物车列表
export async function shopcarList(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/cart/index",fetchs.getAuth("/index/cart/index"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//热门推荐
export async function Recommend(params) {
  return fetchs.read_Token(fetchs.APIHost+"/index/cart/refers",fetchs.getAuth("/index/cart/refers"),JSON.stringify(params)).then(response => response.json())
    .then(json => {return json});
}
//生成订单
export async function Order(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/orderAddAddr",fetchs.getAuth("/index/order/orderAddAddr"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//取消订单
export async function cancel(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/cancel",fetchs.getAuth("/index/order/cancel"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//直接购买生成订单
export async function directOrder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/add",fetchs.getAuth("/index/order/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//申请代理商
export async function Agent(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/subToVip",fetchs.getAuth("/index/user/subToVip"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//获取分类列表
export async function Typelist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/catelist",fetchs.getAuth("/index/User/catelist"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//完善资料
export async function userIn(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/complete",fetchs.getAuth("/index/user/complete"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//推荐人
export async function  Recommen(params) {
  return fetchs.create(fetchs.APIHost+"/index/every/getVipUser",params).then(response => response.json())
    .then(json => {return json});
}
//抢购列表
export async function RashList(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/index/agencyGoods",fetchs.getAuth("/index/index/agencyGoods"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//抢购详情
export async function RashInfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/Goods/detail",fetchs.getAuth("/index/Goods/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//抢购
export async function Rashshop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/applyAgency",fetchs.getAuth("/index/User/applyAgency"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//抢购记录
export async function rashRecord(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/User/agencyRecord",fetchs.getAuth("/index/User/agencyRecord"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//用户抢购订单
export async function Myorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/myQrcode",fetchs.getAuth("/index/user/myQrcode"),JSON.stringify(params)).then(response => response.json())
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
//获取二维码图片
export async function imgUrl(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/qrpic",fetchs.getAuth("/index/user/qrpic"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//获取商品详情
export async function shopInfo(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/detail",params).then(response => response.json())
    .then(json => {return json});
}
//账户管理
export async function Account(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/myAccount",fetchs.getAuth("/index/user/myAccount"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
