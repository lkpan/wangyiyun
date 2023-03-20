<template>
  <itemMusicTop :playList="state.playList" />
  <ItemMusicListVue :musicList='state.musicList' :collection="state.playList.subscribedCount"/>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getMusicItemList } from "@/request/api/item";
import itemMusicTop from "@/components/item/itemMusicTop";
import ItemMusicListVue from "@/components/item/ItemMusicList.vue";
import { getMusicList } from "@/request/api/item";

export default {
  name: "ItemMusic",
  setup() {
    const state = reactive({
      playList: {},
      // 歌曲列表
      musicList:[],
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // 获取歌单信息
      let res = await getMusicItemList(id);
      if (res.data.code == 200) {
        state.playList = res.data.playlist;
        // 防止页面刷新，造成数据丢失，保存到sessionStorage
        sessionStorage.setItem("itemDetail", JSON.stringify(state));
      }
      // 获取歌单列表
      let res1 = await getMusicList(id);
      if (res1.status == 200) {
        state.musicList = res1.data.songs
      }else{
        throw 'error'
      }
    });

    return {
      state,
    };
  },
  components: {
    itemMusicTop,
    ItemMusicListVue,
  },
};
</script>

<style>
</style>