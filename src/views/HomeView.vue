<template>
  <div class="home">
      <!-- 顶部导航栏 -->
  <TopNav />
  <Swiper/>
  <IconList />
  <MusicList/>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import Swiper from '@/components/Swiper.vue'
import IconList from '@/components/home/IconList.vue';
import MusicList from '@/components/home/MusicList'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    Swiper,
    IconList,
    MusicList
  }
}
</script>
