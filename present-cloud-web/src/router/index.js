import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import axios from 'axios'

Vue.prototype.axios = axios
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
    meta: {  requireAuth: false },
    hidden: true
  },
  {
    path: '/forgetPsw',
    component: () => import('@/views/forgetpsw/index'),
    meta: {  requireAuth: false },
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    meta: {  requireAuth: false },
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/exception/403'),
    meta: {  requireAuth: false },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
    meta: {  requireAuth: false },
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
      meta: { title: '??????', icon: 'el-icon-s-home', requireAuth: false, roles: ['teacher', 'admin'] }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userinfo',
    name: 'Example',
    meta: { title: '????????????', icon: 'el-icon-user', requireAuth: true, roles: ['teacher', 'admin'] },
    children: [
      {
        path: 'userinfo',
        name: 'Table',
        component: () => import('@/user/userinf/userinf'),
        meta: { title: '????????????', requireAuth: true, roles: ['teacher', 'admin','student'] }
      }
    ]
  },
  // {
  //   path: '/users',
  //   component: Layout,
  //   redirect: '/usermanage',
  //   name: '????????????',
  //   meta: { title: '????????????', icon: 'el-icon-user-solid', requireAuth: true, roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'usermanage',
  //       name: '????????????',
  //       component: () => import('@/views/system/usermanagement/usermanagement'),
  //       meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
  //     }
  //   ]
  // },
  {
    path: '/course',
    component: Layout,
    redirect: '/class',
    name: 'Example',
    meta: { title: '????????????', icon: 'form', requireAuth: true, roles: ['teacher', 'admin'] },
    children: [
      {
        path: 'courselist',
        name: 'Table',
        component: () => import('@/views/class/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['teacher', 'admin'] }
      },
      {
        path: 'mycourse',
        name: 'Table',
        component: () => import('@/views/class/mine'),
        meta: { title: '????????????', requireAuth: true, roles: ['teacher', 'admin'] }
      }
      // ,
      // {
      //   path: 'create',
      //   name: 'Tree',
      //   component: () => import('@/views/class/create'),
      //   meta: { title: '????????????', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/sysmanage',
    component: Layout,
    redirect: '/sysmanage',
    name: 'Example',
    meta: { title: '????????????', icon: 'el-icon-s-operation', requireAuth: true, roles: ['admin'] },
    children: [
      // {
      //   path: 'table1',
      //   name: 'Table',
      //   component: () => import('@/views/system/usermanagement/usermanagement'),
      //   meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      // },

      {
        path: 'dictionarymanagement',
        name: '????????????',
        component: () => import('@/views/system/datadictionary/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'sysparammanagement',
        name: '????????????',
        component: () => import('@/views/system/systemparameter/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'org',
        name: '????????????',
        component: () => import('@/views/system/orgmanagement/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'usermanage',
        name: '????????????',
        component: () => import('@/views/system/usermanagement/usermanagement'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'tree2',
        name: 'Tree',
        component: () => import('@/views/system/rolemanagement/rolemanagement'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'tree3',
        name: 'Tree',
        component: () => import('@/views/system/menumanagement/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
      },
      {
        path: 'tree4',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '????????????', requireAuth: true, roles: ['admin'] }
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
//     console.log('router.js ??????/????????????/??????')
//     next()
//   } else {
//     const token = localStorage.getItem('Authorization')
//     console.log(token)
//     if (token === 'null' || token === '') { // token === 'null' || token === ''
//       console.log('???????????????????????????')
//       alert('????????????')
//       next('/login')
//     } else {
//       console.log(token)
//       next()
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  console.log('??????????????????', from)
  console.log('??????????????????', to)
  const userToken = getToken()
  if (to.meta.requireAuth) { // ???????????????????????????????????????
    console.log('main-token???', userToken)
    if (userToken) { // ????????????????????????token
      if (to.meta.roles.length !== 0) {
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (getUserRole() === to.meta.roles[i]) {
            next()
            break
          } else if (i === to.meta.roles.length - 1) {
            // console.log('????????????')
            alert('??????????????????')
            next({
              path: from.path
            })
            // next({
            //   path: '/403'
            // })
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
  /* ??????????????????token,??????????????????????????????????????? */
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
