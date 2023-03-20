<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span class="gedan">歌单</span>
    </div>
    <div class="itemRight">
      <!-- 搜索 -->
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
  <!-- 内容区域 -->
  <div class="itemContent">
    <img :src="playList.creator.avatarUrl" alt="" class="leftImg"/>
    <!-- 作者歌曲详细信息 -->
    <div class="detail">
      <span class="title">{{ playList.name }}</span>
      <span class="author">
        <img :src="playList.creator.backgroundUrl" alt="" />
        <i>{{ playList.creator.nickname }}</i>
        <span> > </span>
      </span>
        <div class="description">
        {{ playList.name  }}字太多，先改成这个
      <div style="float: right;font-size: .5rem;"> > </div>
      </div>
    </div>
  </div>
  <!-- 功能区域 -->
  <div class="handler">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <span>40</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>40</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yunduanxiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-duoxuanxuanzhong"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // 如果props还没有传值过来，防止报错得从sessionStorage提取数据
    if (props.playList.creator = "") {
      console.log('出问题了，执行了这段代码，使用本地');
      props.playList.playList.creator = JSON.parse(
        sessionStorage.getItem(itemDetail)
      ).playList.creator;
    }
    const changeCount = (num) => {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };

    return {
      changeCount,
    };
  },
  props: ["playList"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  // padding: 0.2rem;
  position: relative;
  margin: 0;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff; //填充颜色修改，修改svg
    }
  }
  .bgImg {
    height: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}

// 简介区域
.itemContent {
  display: flex;
  justify-content: start;
  // align-items: center;
  overflow: hidden;
  height: 3rem;
  width: 100%;
  .leftImg {
    height: 3rem;
    border-radius: .5rem;
    margin-left: .2rem;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-left: 0.2rem;
    .title {
      font-weight: 900;
    }
    .author {
      display: flex;
      margin: .2rem 0;
      vertical-align: center;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }
      span{
        margin-left: .2rem;
      }
    }
    .description{
      height: .3rem;
      color: rgb(120, 115, 115);
      font-size: .24rem;
    }
  }
}
// 功能区域
.handler{
  display: flex;
  justify-content: space-around;
  margin-top: .4rem;
  .icon{
    font-size: 1rem;

  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      font-size: .36rem;
    }
  }
}
</style>