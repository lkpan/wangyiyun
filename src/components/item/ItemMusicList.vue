<template>
  <div class="musicContent">
    <!-- 上部操作功能 -->
    <div class="musicTop">
      <div class="play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span class="playAll"
          >播放全部<span class="count">(共{{ 20 }}首)</span></span
        >
      </div>
      <van-button round type="success" class="collection" color="red"
        >+ 收藏({{ collection }})</van-button
      >
    </div>
    <!-- 播放列表 -->
    <div class="musicList" v-if="state.musicItems">
      <div class="leftMusic" >
        <van-row
          class="itemList"
          v-for="(item, index) in state.musicItems"
          :key="index"
          @click="palyMusic(index)"
        >
          <van-col span="2" class="index">{{ index + 1 }}</van-col>
          <van-col span="10">
            <van-cell-group>
              <van-cell :title="item.name" :label="item.name" />
            </van-cell-group>
          </van-col>
          <van-col span="12" class="rightIcon">
            <span class="playIcon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shipin"></use>
              </svg>
            </span>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
              </svg>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from "vue";
import { mapMutations } from "vuex";
export default {
  name: "ItemMusicList",
  setup(props) {
    const state = reactive({
      musicItems: [],
      palyActive:false
    })
    
    onMounted(() => {
      // 收藏量
      const collection = props.collection || "";
      // // 音乐列表
      state.musicItems = props.musicList || [];
      
    });
    watch(
      () => props.musicList,
      (newval, oldVal) => {
        state.musicItems = newval;
      }
    );

    return {
      state,
    };
  },

  props: ["musicList", "collection"],
  methods:{
    // 点击歌曲事件
    palyMusic : function(index){
      const musicItems = this.state.musicItems
      this.updateList({musicItems,index})
    },
    ...mapMutations(['updateList']),
  }
};
</script>

<style scoped lang="less">
.musicContent {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background-color: #fff;
  .musicTop {
    display: flex;
    justify-content: space-between;
    margin: 0.3rem 0.2rem;
    height: 1rem;

    .play {
      display: flex;
      align-items: center;
      .playAll {
        margin-left: 0.3rem;
        .count {
          font-size: 0.2rem;
          color: rgb(126, 126, 126);
        }
      }
    }
    .collection {
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
    }
  }
  .musicList {
    .index {
      display: flex;
      align-items: center;
    }
    .rightIcon {
      display: flex;
      align-items: center;
      justify-content: end;
      z-index: 99;
      padding: 0 0.2rem;
      .playIcon {
        margin-right: 0.2rem;
      }
    }
  }
  .van-cell {
    width: 6rem;
  }
}
</style>