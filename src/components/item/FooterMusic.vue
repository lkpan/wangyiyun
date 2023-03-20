<template>
  <div class="FooterMusic" @click="toDetail(playList[playListIndex].id)">
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <div class="leftMusic">
      <van-row class="itemList">
        <van-col span="3" class="index">
          <img :src="playList[playListIndex].al?.picUrl||playList[playListIndex].picUrl" alt="" class="" />
        </van-col>
        <van-col span="16">
          <van-cell-group>
            <van-cell
              :title="playList[playListIndex].al?.name||playList[playListIndex].name"
              label="横划可以切换上下曲哦"
            />
          </van-cell-group>
        </van-col>
        <van-col span="5" class="rightIcon">
          <div>
            <span class="playIcon"  v-show="isPlay">
            <svg class="icon" aria-hidden="true" @click.stop="play">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </span>
          <span class="playIcon"  v-show="!isPlay">
            <svg class="icon" aria-hidden="true" @click.stop="play">
              <use xlink:href="#icon-zanting"></use>
            </svg>
          </span>
          </div>
          <span class='playlistMusic'>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-playlistMusic"></use>
            </svg>
          </span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "FooterMusic",
  data() {
    return {
      musicDuration:0,

    }
  },
  computed: {
   
    ...mapState(["playList", "playListIndex", "isPlay",'currentTime']),
  },
  methods: {
    play: function () {
      if (this.$refs.audio.paused) {
        setTimeout(() => {
            this.$refs.audio.play();
          this.updatePlay(false);
        }, 300);
      } else {
          this.$refs.audio.pause();
          this.updatePlay(true);
      }
    },
    ...mapMutations(["updatePlay",'upateDuration']),
    toDetail:function(id){
      this.$router.push({name:'musicDetail',query:{id:id}})
    }
  },
  watch:{
    playListIndex:function(){
      let duration = this.$refs.audio.duration||1
      this.musicDuration = duration
      this.$store.commit('upateDuration',duration)
    },
    currentTime:function(){
      this.$refs.audio.currentTime = this.currentTime
    }
  }
};
</script>

<style lang="less" scoped>
.FooterMusic {
  height: 1.4rem;
  width: 100%;
  background-color: #fff;
  border-top: 0.02rem solid black;
  // opacity: 0.8;
  position: fixed;
  z-index: 100;
  bottom: 0;
  margin: 0;
  padding: 0.2rem;
  .itemList {
    width: 100%;
    height: 100%;
    display: flex;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .index {
      display: flex;
      align-items: center;
    }
    .rightIcon {
      display: flex;
      align-items: center;
      justify-content: end;
      .playIcon {
        width: .36rem;
        margin-right: 0.22rem;
      }
      .playlistMusic{
        margin-left: .22rem;
      }
    }
  }
}
</style>