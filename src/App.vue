<template>
  <router-view></router-view>
  <FooterMusic v-show="$route.meta.show" />
</template>
<script>
import HomeView from "./views/HomeView.vue";
import FooterMusic from "@/components/item/FooterMusic.vue";
export default {
  name: "App",
  components: {
    HomeView,
    FooterMusic,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}

</style>
