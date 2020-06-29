import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete, onAbort) {
  return routerPush.call(this, location, onComplete, onAbort).catch(error => error)
}

Vue.use(Router)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/empty',
    children: [
      {
        path: 'empty',
        component: () => import('@/views/emptypage/index'),
        name: 'EmptyPage',
        meta: { title: 'EmptyPage', icon: 'emptypage', affix: true }
      }
    ]
  },
  {
    path: '/send',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/send/index'),
        name: 'send',
        meta: { title: 'send', icon: 'send', affix: true }
      }
    ]
  },
  {
    path: '/browse',
    component: Layout,
    children: [
      {
        path: '/browse/:id',
        component: () => import('@/views/browse/index'),
        props: true,
        name: 'browse',
        meta: { title: 'browse', icon: 'browse', affix: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
