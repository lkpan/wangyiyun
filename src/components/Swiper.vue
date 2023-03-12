<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import axios from "axios";
import {getBanner} from '@/request/api/home'
import { onMounted, reactive } from "vue";
export default {
  name: "Swiper",
  setup() {
    const state = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(async () => {
      const result = await getBanner()
      if(result.status==200){
        state.images = result.data.banners
      }else{
        return Error('error')
      }
      
    });
    return { state };
  },
};
</script>

<style lang="less">
.van-swipe {
  width: 100%;
  padding: 0.2rem;
  .van-swipe__track {
    .van-swipe-item {
      img {
        width: 100%;
        height: 3rem;
      }
    }
  }
}
</style>