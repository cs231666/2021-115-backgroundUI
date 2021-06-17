import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { getToken, getCode, setToken, setCode, setUser, getUser, setUserId, getUserId, setUserRole, getUserRole } from '@/utils/auth'
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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/forgetPsw',
    component: () => import('@/views/forgetpsw/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/exception/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/exception/500'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', requireAuth: true,roles: ['teacher','admin'] }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userinfo',
    name: 'Example',
    meta: { title: '个人中心', icon: 'el-icon-user-solid',requireAuth: true, roles: ['teacher','admin' ] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/user/userinf/userinf'),
        meta: { title: '个人信息', requireAuth: true,roles: ['teacher','admin' ] }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '个人设置' }
      // }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class',
    name: 'Example',
    meta: { title: '班课', icon: 'form',requireAuth: true, roles: ['teacher', 'admin'] },
    children: [
      {
        path: 'query',
        name: 'Table',
        component: () => import('@/views/class/index'),
        meta: { title: '班课管理', icon: 'table',requireAuth: true, roles: ['teacher', 'admin'] }
      }
      // ,
      // {
      //   path: 'create',
      //   name: 'Tree',
      //   component: () => import('@/views/class/create'),
      //   meta: { title: '创建班课', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/1',
    component: Layout,
    redirect: '/dashboard2',
    name: 'Example',
    meta: { title: '系统管理', icon: 'el-icon-s-tools', requireAuth: true,roles: ['admin'] },
    children: [
      {
        path: 'table1',
        name: 'Table',
        component: () => import('@/views/system/usermanagement/usermanagement'),
        meta: { title: '用户管理', requireAuth: true,roles: ['admin'] }
      },
      {
        path: 'tree2',
        name: 'Tree',
        component: () => import('@/views/system/rolemanagement/rolemanagement'),
        meta: { title: '角色管理', requireAuth: true,roles: ['admin'] }
      },
      {
        path: 'tree3',
        name: 'Tree',
        component: () => import('@/views/system/menumanagement/index'),
        meta: { title: '菜单管理',requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'tree4',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限管理', requireAuth: true,roles: ['admin'] }
      },
      {
        path: 'tree5',
        name: 'Tree',
        component: () => import('@/views/system/datadictionary/index'),
        meta: { title: '数据字典',requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'tree6',
        name: 'Tree',
        component: () => import('@/views/system/systemparameter/index'),
        meta: { title: '系统参数',requireAuth: true, roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.path === '/forgetPsw' || to.path === '/register') {
//     console.log('router.js 登录/忘记密码/注册')
//     next()
//   } else {
//     const token = localStorage.getItem('Authorization')
//     console.log(token)
//     if (token === 'null' || token === '') { // token === 'null' || token === ''
//       console.log('路由拦截，请先登录')
//       alert('请先登录')
//       next('/login')
//     } else {
//       console.log(token)
//       next()
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  console.log('上一个页面：', from)
  console.log('下一个页面：', to)
  let userToken = getToken()
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    console.log('main-token：', userToken)
    if (userToken) { // 判断本地是否存在token
      if (to.meta.roles.length !== 0) {
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (getUserRole() === to.meta.roles[i]) {
            next()
            break
          } else if (i === to.meta.roles.length - 1) {
            next({
              path: '/403'
            })
          }
        }
      } else {
        next()
      }
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  /* 如果本地存在token,则不允许直接跳转到登录页面 */
  if (to.fullPath === '/Login') {
    if (userToken) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})
export default router
