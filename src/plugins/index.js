// 引入swiper轮播图
import { Swipe, SwipeItem,Button,showToast  } from 'vant';
// 放入数组中
let plugins = [
    Swipe,SwipeItem,Button,showToast 
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}