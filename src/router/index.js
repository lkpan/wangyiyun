import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'



// 配置路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由守卫
// router.beforeEach(async (to, from, next)=>{
//   if(to.path=='/login'){
    

//   }
// })

export default router
