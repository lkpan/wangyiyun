<template>
  <div class="login-container">
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
      ></van-field>
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        type="password"
      ></van-field>
    </van-cell-group>
    <van-button type="primary" @click="handleLogin" disabled>登录</van-button>
    <van-button type="primary" @click="qrCodeLogin">二维码登录</van-button>
    <van-button type="primary" @click="logoutBtn">退出登录</van-button>
    <van-overlay :show="show" @click="stopShow">
      <div class="wrapper">
        <div class="block">
          <img :src="QrImg" alt="" style="width: 100%; height: 100%" />
          {{  }}
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getQrKey, getQrCode, checkQr,logout } from "@/request/api/user";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      Qrkey: "", //请求获得的key
      show: false, // 展示遮罩层
      QrImg: "", // 二维码图片
      timer: 0, // 定时器
      QrTip:'等待扫码1'
    };
  },
  methods: {
    handleLogin() {
      // 这里可以编写登录逻辑
      console.log("username:", this.username);
      console.log("password:", this.password);
    },
    // 点击二维码登录
    async qrCodeLogin() {
      let res = await getQrKey();
      if (res.data?.code == 200) {
        // 保存获取到的key
        this.Qrkey = res.data.data.unikey;
        // 在通过key获取二维码
        let timechuo = Date.parse(new Date())
        let res1 = await getQrCode(this.Qrkey,timechuo);
        console.log(res1, "res1");
        if (res1.data?.code == 200) {
          this.QrImg = res1.data.data.qrimg;
          console.log(this.QrImg,'qrimg');
        }
        // 显示完二维码后，要持续检测登录状态
        this.timer = setInterval(async () => {
          let checkRes = await checkQr(this.Qrkey);
          console.log(checkRes.data.code, "check");
          if(checkRes.data.code==803){
            console.log('成功',checkRes);
            // 说明登录成功，获取cookie，关闭遮罩层，清除计时器,去往首页或者个人中心
            clearInterval(this.timer)
            this.show = false
            this.$router.push('/center')
            // this.cookie = checkRes.data.cookie  还是存到store里面
          }else if(checkRes.data.code){
            console.log(checkRes.data.message);
            this.QrTip = checkRes.data.message
          }
          
        }, 1000);
      }
      // 展示遮罩层
      this.show = true;
      //
    },
    // 点击遮罩层其他地方
    stopShow(){
      this.show = !this.show
      if(this.timer||this.show==false){
        clearInterval(this.timer)
      }
    },
    // 退出登录按钮
    async logoutBtn(){
      let res = await logout()
      if(res.data.code==200){
        alert('退出成功')
      }
    }
  },
};
</script>

<style>
.login-container {
  padding: 20px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
