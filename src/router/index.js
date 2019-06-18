import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'Home',
      meta: { title: '首页', icon: 'home' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/hotel',
    component: Layout,
    redirect: '/hotel/hotelInfo',
    alwaysShow: true,
    name: 'Hotel',
    meta: {
      title: '酒店管理',
      icon: 'hotel',
      roles: ['admin']
    },
    children: [
      {
        path: 'hotelInfo',
        component: () => import('@/views/hotel/HotelInfo'),
        meta: { title: '酒店信息', icon:'hotel-info' ,roles: ['admin'] }
      },
      {
        path: 'hotelSetting',
        component: () => import('@/views/hotel/HotelSetting'),
        meta: { title: '酒店设置', icon:'hotel-settings', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/dataModify',
    alwaysShow: true,
    name: 'Personal',
    meta: {
      title: '个人中心',
      icon: 'personal',
      roles: ['admin']
    },
    children: [
      {
        path: 'dataModify',
        component: () => import('@/views/personal/DataModify'),
        meta: { title: '资料修改',icon:'data-modify', roles: ['admin'] }
      },
      {
        path: 'accountBind',
        component: () => import('@/views/personal/AccountBind'),
        meta: { title: '账号绑定',icon:'account-bind', roles: ['admin'] }
      },
      {
        path: 'notificationCenter',
        component: () => import('@/views/personal/NotificationCenter'),
        meta: { title: '通知中心',icon:'notification-center', roles: ['admin'] }
      },
      {
        path: 'feedback',
        component: () => import('@/views/personal/Feedback'),
        meta: { title: '问题反馈',icon:'feedback', roles: ['admin'] }
      },
    ]
  },

  {
    path: '/group',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/group/index'),
        meta: { title: '集团管理', icon: 'group', roles: ['admin'] }
      }
    ]
  },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
