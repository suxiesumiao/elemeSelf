import Vue from 'vue'
import Router from 'vue-router'
// 外卖页面
import Msite from '@/components/msite/Msite'
// 发现页面
import Discover from '@/components/discover/Discover'
// 订单页面
import Order from '@/components/order/Order'
// 个人页面
import Profile from '@/components/profile/Profile'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/msite',
    name: 'Msite',
    component: Msite
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }]
})
