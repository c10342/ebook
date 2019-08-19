import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      name: 'ebook',
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: () => import('./views/ebook'),
      children: [
        {
          path: ':filename',
          component: () => import('./components/ebook/EbookReader')
        }
      ]
    }
  ]
})
