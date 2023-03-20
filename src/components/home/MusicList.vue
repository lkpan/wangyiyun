<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="120"
        class="mySwipe"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(music, index) in state.musicList"
          :key="index"
          class="musicItem"
        >
          <router-link :to="{ path: '/itemMusic', query: { id: music.id } }">
            <img :src="music.picUrl" alt="" class="singPic" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
              <span class="count">{{ changeCount(music.playCount) }}</span>
            </span>
            <span class="musicName">{{ music.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { onMounted, reactive } from "vue";
export default {
  name: "MusicList",
  // vue2写法
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   // 获取歌单
  //   async getSongSheet() {
  //     let res = await getMusicList();
  //     if (res.status == 200) {
  //       this.musicList = res.data.result;
  //     }
  //   },
  //   // 处理播放量数据
  //   changeCount(num){
  //     if(num>100000000){
  //       return (num/100000000).toFixed(1) + '亿'
  //     }else if(num>=10000){
  //       return(num/10000).toFixed(1) + '万'
  //     }
  //   }
  // },
  // mounted() {
  //   this.getSongSheet();
  // },

  // vue3写法
  setup() {
    const state = reactive({
      musicList: [],
    });
    // 处理播放量数据
    const changeCount = (num) => {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };
    onMounted(async () => {
      let res = await getMusicList();
      // 获取到的个但是数据复制给musicList
      if (res.status == 200) {
        state.musicList = res.data.result;
      }
    });
    return {
      state,
      changeCount,
    };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .mySwipe {
      height: 100%;
      .musicItem {
        position: relative;
        z-index: 99;
        .singPic {
          width: 100%;
          height: 2.4rem;
          border-radius: 0.2rem;
        }
        .playCount {
          position: absolute;
          top: 0;
          left: .8rem;
          color: rgb(240, 241, 234);
          .icon {
            height: 0.25rem;
            align-items: center;
            margin: 0;
            fill: #fff;
          }
          .count {
            line-height: 0.5rem;
            font-size: 0.1rem;
          }
        }
      }
    }
    .musicItem {
      margin: 0.1rem;
    }
  }
}
.musicName {
  color: black;
}
</style>