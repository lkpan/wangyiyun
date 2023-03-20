<template>
  <div class="content">
    <!-- 搜索框 -->
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <van-search
        v-model="searchItem"
        placeholder="陈奕迅"
        @search="searchAny"
        :name="searchItem"
        class="input"
      />
    </div>
    <!-- 历史 -->
    <div class="history">
      <div class="item">
        <span style="font-weight: 900">历史</span>
        <span v-if="state.searchedItems?.length > 0">
          <span
            class="searched"
            v-for="(item, index) in state.searchedItems"
            :key="index"
            >{{ item }}</span
          >
        </span>
      </div>
      <div class="delete">
        <van-icon name="delete-o" />
      </div>
    </div>
    <!-- 播放全部 -->
    <div class="playAll">
      <van-icon name="play-circle-o" class="icon" />
      <span class="play">播放全部</span>
      <span class="count">共{{ state.recommand.length }}首</span>
    </div>
    <!-- 推荐 -->
    <div class="musicList">
      <div class="leftMusic" v-if="state.recommand">
        <van-row
          class="itemList"
          v-for="(item, index) in state.recommand"
          :key="index"
          @click="palyMusic(index)"
        >
          <van-col span="2" class="index">{{ index + 1 }}</van-col>
          <van-col span="10">
            <van-cell-group>
              <van-cell :title="item.name" :label="item.song.artists[0].name" />
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getSearchList, getMusicRec } from "@/request/api/item";
import { useStore } from "vuex";
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: "Search",
  setup(props) {
    const state = reactive({
      recommand: [], // 推荐列表
      songsList: {}, // 歌曲列表
    });
    let searchedItems = ref([]) // 搜索历史记录
    let searchItem = ref("");
    let store = useStore();
    // 添加历史记录事件
    const addHistory = function (value) {
      console.log(searchedItems,688);
      // searchedItems = localStorage.getItem('searchedItems.value')
      let items = []
      searchedItems.forEach(ele => {
        items.push(ele.item)
      });
      if (!items.includes(value)) {
        searchedItems.push({id:uuidv4(),item:value});
        console.log(items,value);
        localStorage.setItem("searchedItems", JSON.stringify(searchedItems));
      } else {
        alert("数组为空");
      }
    };
    // 点击事件，搜索
    const searchAny = async function () {
      if (searchItem.value.trim()) {
        addHistory(searchItem.value.trim());
        let res = await getSearchList(searchItem.value); // 访问响应式数据需要使用.value属性
        if (res.data.code == 200) {
          state.songsList = res.data.result;
        }
      }
    };
    
    onMounted(async () => {
      searchedItems = JSON.parse(localStorage.getItem('searchedItems'))
      let res = await getMusicRec();
      if (res?.data.code == 200) {
        state.recommand = res.data.result;
      }
    });
    // 点击歌曲列表
    const palyMusic = function (index) {
      store.commit("updateList", { musicItems:state.recommand, index });
    };
    return {
      state,
      searchAny,
      addHistory,
      palyMusic,
      searchItem,
      searchedItems
    }; // 通过return语句导出变量和函数
  },
  
});
</script>


<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .input {
      flex: 1;
      width: 100%;
    }
  }
  .history {
    display: flex;
    justify-content: space-between;
    .item {
      height: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: start;
      span {
        margin: 0.2rem 0.2rem;
      }
      .searched {
        font-size: 0.18rem;
        margin: 0.2rem;
        padding: 0.1rem;
        background-color: rgb(154, 153, 153);
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
      }
    }
    .delete {
    }
  }
  .playAll {
    margin-top: 0.2rem;
    .icon {
      margin: 0.1rem;
    }
    .play {
      font-weight: 900;
    }
    .count {
      font-size: 0.15rem;
      color: rgb(149, 149, 149);
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
}
</style>