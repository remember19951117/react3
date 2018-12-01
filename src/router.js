import React from 'react';
import {Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history,app }) {

  // 首页
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/IndexPage'),
  });

// 订单
const Order = dynamic({
  app,
  models: () => [
    import('./models/user'),
  ],
  component: () => import('./routes/Order'),
});

// 购物车
const Shopcar = dynamic({
  app,
  models: () => [
    import('./models/goods'),
  ],
  component: () => import('./routes/Shopcar'),
});
// 支付订单
const Payment = dynamic({
  app,
  models: () => [
    import('./models/goods'),
  ],
  component: () => import('./routes/Payment'),
});
// 个人中心
const Mine = dynamic({
  app,
  models: () => [
    import('./models/user'),
  ],
  component: () => import('./routes/Mine'),
});
// 门店商品详情
const Shopinfo = dynamic({
  app,
  models: () => [
    import('./models/home'),
  ],
  component: () => import('./routes/Shopinfo'),
});
// 申请代理商
const Agent = dynamic({
  app,
  models: () => [
    import('./models/user'),
  ],
  component: () => import('./routes/Agent'),
});
// 门店提现
const Putforward = dynamic({
  app,
  models: () => [
    import('./models/user'),
  ],
  component: () => import('./routes/Putforward'),
});
// 我的团队
  const Myteam = dynamic({
  app,
  models: () => [
    import('./models/user'),
  ],
  component: () => import('./routes/Myteam'),
});
//收益明细
  const Profit = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Profit'),
  });
  //地址管理
  const Address = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Address'),
  });
  //添加地址
  const Addsite = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Addsite'),
  });
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Login'),
  });
  //注册
  const Register = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Register'),
  });
  // 商品二级列表,店铺列表,搜索列表
  const Leveltwo = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/Leveltwo'),
  });
  // 个人资料
  const MineInfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/mineInfo'),
  });
  //上传资料
  const Information = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Information'),
  });
  //查看资料
  const UserInfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Userinfo'),
  });
  //完善资料
  const Datainfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Datainfo'),
  });
  // 提现记录
  const Paylist = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Paylist'),
  });
  // 修改密码
  const Changeps = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/ForgetPS'),
  });
  // 代理抢购
  const Rash = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Rash'),
  });
  // 填写抢购资料
  const Rashagent = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Rushagent'),
  });
  // 代理抢购详情
  const Rashshop = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Rashshop'),
  });
  // 代理抢购记录
  const Rashlist = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Rashlist'),
  });
  // 财务管理
  const Money = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Money'),
  });
  // 我的抢购订单
  const Myorder = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Myorder'),
  });
  // 注册协议
  const Agreement = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Gvrp'),
  });
  // 代理商协议
  const Agentment = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Gvrptwo'),
  });
  // 新闻详情
  const News = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/New'),
  });
  //新闻列表
  const Newslist = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/Newslist'),
  });
  //添加朋友
  const Addfriend = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Addfriend'),
  });
  //账户管理
  const Account = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Account'),
  });
  //版权信息
  const Copyright = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Copyright'),
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forget" exact component={Changeps} />
        <Route path="/cart" exact component={Shopcar} />
        <Route path="/shoppay" exact component={Payment} />
        <Route path="/order" exact component={Order} />
        <Route path="/mine" exact component={Mine} />
        <Route path="/address" exact component={Address} />
        <Route path="/addsite" exact component={Addsite} />
        <Route path="/mineteam" exact component={Myteam}/>
        <Route path="/profit" exact component={Profit}/>
        <Route path="/shopcar" exact component={Shopcar} />
        <Route path="/putforward" exact component={Putforward} />
        <Route path="/agent" exact component={Agent} />
        <Route path="/shopinfo" exact component={Shopinfo} />
        <Route path="/levelshop" exact component={Leveltwo} />
        <Route path="/mineinfo" exact component={MineInfo} />
        <Route path="/info" exact component={Information} />
        <Route path="/datainfo" exact component={Datainfo} />
        <Route path="/userinfo" exact component={UserInfo} />
        <Route path="/myorder" exact component={Myorder} />
        <Route path="/paylist" exact component={Paylist} />
        <Route path="/rash" exact component={Rash} />
        <Route path="/rashagent" exact component={Rashagent} />
        <Route path="/rashshop" exact component={Rashshop} />
        <Route path="/rashlist" exact component={Rashlist} />
        <Route path="/money" exact component={Money} />
        <Route path="/myorder" exact component={Myorder} />
        <Route path="/agreement" exact component={Agreement} />
        <Route path="/gvrp" exact component={Agentment} />
        <Route path="/newsinfo" exact component={News} />
        <Route path="/newslist" exact component={Newslist} />
        <Route path="/addfriend" exact component={Addfriend} />
        <Route path="/account" exact component={Account} />
        <Route path="/copyright" exact component={Copyright} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
