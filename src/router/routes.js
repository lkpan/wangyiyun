import store from '@/store'

export default [
    {
      path: '/',
      name: 'home',
      meta:{show:true},
      component: ()=>import('@/views/HomeView.vue')
    },
    {
      path: '/itemMusic',
      name: 'itemMusic',
      meta:{show:true},
      component: ()=>import('@/views/ItemMusic.vue')
    },
    {
      path: '/musicDetail',
      name: 'musicDetail',
      component: ()=>import('@/views/MusicDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta:{show:true},
      component: ()=>import('@/views/Search.vue')
    },
    {
      path: '/center',
      name: 'center',
      component: ()=>import('@/views/Center.vue'),
      // beforeEnter: (to, from, next) => {
      //   if(store.state.isLogin===true){
      //     next()
      //   }else{
      //     next('/login')
      //   }
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/Login.vue'),
    },
  ]