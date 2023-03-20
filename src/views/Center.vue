<template>
  <button @click="getInfo">获取游客信息</button>
  <van-sidebar v-model="active">
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
</van-sidebar>
</template>

<script>
import {getAnonimous} from '@/request/api/user'
export default {
  name:'Center',
  methods:{
    getInfo: async function(){
      let res = await getAnonimous()
      console.log(res,'res');
    }
  }
}
</script>

<style>

</style>