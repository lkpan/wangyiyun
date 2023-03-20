<template>
  <img class="bg" :src="playList[playListIndex].al?.picUrl||playList[playListIndex].picUrl" alt="" />
  <div class="MusicDetail">
    <!-- 顶部 -->
    <div class="top">
      <div class="leftBack">
        <span @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        </span>
        <Vue3Marquee>
          <p class="name">{{ playList[playListIndex].al?.name||playList[playListIndex].name }}</p>
        </Vue3Marquee>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中部 -->
    <!-- 唱片界面 -->
    <div class="content" v-show="!isShowLyric" @click="showLyrics">
      <div class="musicBg"></div>
      <img
        src="@/assets/images/singzhen.png"
        alt=""
        :class="{ zhen: true, active: !isPlay }"
      />
      <img
        :src="playList[playListIndex].al?.picUrl||playList[playListIndex].picUrl"
        alt=""
        :class="{ circle: true, img_ar_active: !isPlay, img_ar_paused: isPlay }"
      />
    </div>
    <!-- 歌词界面 -->
    <div class="content" v-if="isShowLyric" @click="isShowLyric = false">
      <div class="allLyric" ref="activeLyric">
        <p
          
          v-for="(item, index) in lyric"
          :key="index"
          :class="{
            activeLyric:
              parseInt(currentTime) * 1000 >= item.time &&
              item.next > parseInt(currentTime) * 1000,
          }"
        >
          {{ item.lrc }}
        </p>
      </div>
    </div>
    <!-- 下部 -->
    <div class="xiabu">
      <div class="opration">
        <div class="opIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
        </div>
        <div class="opIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yunduanxiazai"></use>
          </svg>
        </div>
        <div class="opIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg>
        </div>
        <div class="opIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
        </div>
        <div class="opIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-playlistMusic"></use>
          </svg>
        </div>
      </div>

      <div class="progress">
        <span>{{ start }}</span>
        <input type="range" class="range" min="0" :max="musicDuration" step="0.05" v-model="ctime">
        <span>{{ end }}</span>
      </div>

      <div class="buttom">
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
        </i>
        <!-- 上一首 -->
        <i @click="switchSongs(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
        </i>
        <i>
          <!-- 播放和暂停 -->
          <svg class="icon" aria-hidden="true" @click="play" v-show="isPlay">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="play" v-show="!isPlay">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </i>
        <!-- 下一首 -->
        <i @click="switchSongs(1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
        </i>
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-playlistMusic"></use>
          </svg>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
import { getLyrics } from "@/request/api/item";
export default {
  name: "MusicDetail",
  data() {
    return {
      isShowLyric: false, //显示歌词
      timer: 0, // 定时器
      lyricTop:0, // 歌词距离顶部高度
      ctime:0, // 用来被监视的当前时间
      
    };
  },
  computed: {
      start:function(){
        if(this.currentTime>60){
          return `${parseInt(this.currentTime/60)}:${parseInt(this.currentTime)%60}`
        }else{
          return `00:${parseInt(this.currentTime)}`
        }
      },
      end:function(){
        if(this.musicDuration>60){
          return `${parseInt(this.musicDuration/60)}:${parseInt(this.musicDuration)%60}`
        }else{
          return `00:${parseInt(this.musicDuration)}`
        }
      },
    ...mapState([
      "playList",
      "playListIndex",
      "isPlay",
      "songInfo",
      "currentTime",
      'musicDuration',

    ]),
    lyric: function () {
      let arr;
      if (this.songInfo.lrc.lyric) {
        arr = this.songInfo.lrc.lyric
          .split(/[(\r\n)\r\n]+/)
          .map((item, index) => {
            let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
            let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
            let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
            let lrc = item.slice(item.indexOf("]") + 1, item.length);
            let time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            return { min, sec, mill, lrc, time };
          });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i+1].time)) {
            item.next = 1000000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  components: {
    Vue3Marquee,
  },
  methods: {
    // 播放音乐
    play: function () {
      if (document.querySelector("audio").paused) {
        setTimeout(() => {
          // 播放开启定时器
          this.updateTime();
          document.querySelector("audio").play();
          this.updatePlay(false);
        }, 0);
      } else {
        document.querySelector("audio").pause();
        this.updatePlay(true);
        // 暂停清除定时器
        clearInterval(this.timer);
      }
    },
    // 展示歌词
    showLyrics: async function () {
      // 如果songinfo没有数据就进行请求
      if (!this.songInfo.status) {
        const result = await getLyrics(this.playList[this.playListIndex].id);
        this.isShowLyric = !this.isShowLyric;

        // 请求成功
        if (result.status == 200) {
          this.updateLyric(result.data);
        }
      } else {
        this.isShowLyric = !this.isShowLyric;
      }
    },
    // 修改当前时间
    updateTime: function () {
      this.timer = setInterval(() => {
        let audio = document.querySelector("audio")
        this.updateCurrentTime(audio.currentTime);
      }, 300);
    },
    switchSongs(num) {
      let index = this.playListIndex + num
      if(index<0||isNaN(index)){
        index = this.playList.length-1
      }else if(index==this.playList.length){
        index = 0
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations([
      "updatePlay",
      "updateLyric",
      "updateCurrentTime",
      "updatePlayListIndex",
    ]),
  },
  watch:{ 
    currentTime:function(){
      // 如果是不在歌词页面的话就不执行
      if(this.isShowLyric){
        let ct = document.querySelector('p.activeLyric')
        if(parseInt(ct.offsetTop||ct)>262){
          this.$refs.activeLyric.scrollTop = ct.offsetTop - 262
        }
      }
    },
    ctime:function(){
      this.updateCurrentTime(this.ctime)
    }
  }
  
};
</script>

<style lang='less' scoped>
.bg {
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: -99;
  height: 100vh;
  width: 100%;
  filter: blur(30px);
}
.MusicDetail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.2rem;
    color: #fff;
    fill: #fff;

    .share {
      fill: #fff;
    }
  }
  .content {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .musicBg {
      width: 5rem;
      height: 5rem;
      background-color: black;
      position: absolute;
      border-radius: 60%;
    }
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 60%;
      z-index: 2;
    }
    .zhen {
      position: absolute;
      z-index: 108;
      top: -1rem;
      left: 3rem;
      transform-origin: 45 6;
      transform: rotate(30deg);
      transition: all 1s linear;

      &.active {
        transform-origin: 45 6;
        transform: rotate(0deg);
        transition: all 1s linear;
      }

      @keyframes rotate_ar {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
    .circle {
      animation: rotate_ar 10s linear infinite;
    }
    .img_ar_active {
      animation-play-state: running;
    }
    .img_ar_paused {
      animation-play-state: paused;
    }
    .allLyric {
      width: 100%;
      height: 9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.2rem;
      overflow: scroll;
      p {
        color: rgb(217, 216, 216);
        margin-bottom: 0.4rem;
      }
      .activeLyric {
        color: #fff;
        font-size: 0.5rem;
      }
    }
  }
  .opration {
    display: flex;
    justify-content: space-around;
  }
  .leftBack {
    display: flex;
    .name {
      font-size: 0.4rem;
      display: flex;
      align-items: center;
      margin-left: 0.22rem;
      width: 1.5rem;
      height: 0.58rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .xiabu {
    // display: flex;
    fill: #fff;
    .progress {
      display: flex;
      color: rgb(255, 255, 255);
      margin: 0.8rem 0.2rem;
      span{
      font-size: .10rem;
      }
      .range{
        width: 100%;
      }
    }
    .buttom {
      display: flex;
      justify-content: space-around;
      margin-bottom: 0.1rem;
    }
  }
}
</style>