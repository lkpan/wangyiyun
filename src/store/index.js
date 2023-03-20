import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id:73470912,
        name:"RIP",
        pic:109951167659169500,
        picUrl:"https://p1.music.126.net/v9dcD4sQ8DRBkFr279pmAQ==/109951167659169497.jpg",
        pic_str:"109951167659169497"
      },
      id:1313102149, //音乐id
    }],
    playListIndex:0,
    isPlay:true, //暂停按钮显示
    songInfo:{}, // 当前歌曲歌词等信息
    currentTime:0, // 歌曲当前时间
    musicDuration:0, //歌曲总长
    
    //user部分
    isLogin:false, //登录状态
    key:''  // 
  },
  getters: {
  },
  mutations: {
    // 更改播放按钮状态
    updatePlay:function(state,value){
      state.isPlay = value
    },
    // 添加歌曲列表到vuex中
    updateList:function(state,{musicItems,index}){
      console.log(musicItems,index,'修改');
      state.playList = musicItems
      state.playListIndex = index
    },
    // 修改歌词等歌曲信息
    updateLyric:function(state,songInfo){
      state.songInfo = songInfo
    },
    // 修改歌曲当前时间
    updateCurrentTime:function(state,time){
      state.currentTime = time

    },
    // 修改当前那歌曲信息
    updatePlayListIndex:function(state, index){
      state.playListIndex = index
    },
    // 修改歌曲总长
    upateDuration:function(state,duration){
      state.musicDuration = duration
    },
    // 修改登录状态
    updateIsLogin:function(state,value){
      state.isLogin = value
    }
  },
  actions: {
    
  },
  modules: {
  }
})
