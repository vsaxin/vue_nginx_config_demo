<template>
  <div class="home">
    <div class="w"></div>
    <div class="content">
      <el-input class="mb" v-model="user_name" placeholder="用户名"></el-input>
      <el-input
        class="mb"
        type="password"
        v-model="password"
        placeholder="密码"
      ></el-input>
      <el-button
        class="mb"
        type="success"
        @click="login1"
        :loading="loading.login1"
        >v1-登录</el-button
      ><br />
      <el-button
        class="mb"
        type="success"
        @click="login2"
        :loading="loading.login2"
        >v2-登录</el-button
      ><br />
      <el-button class="mb" type="danger" @click="login3">跨域</el-button>
    </div>
    <div class="w"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: {
        login1: false,
        login2: false
      },
      user_name: "",
      password: ""
    };
  },
  methods: {
    login1() {
      const form = new FormData();
      form.append("user_name", this.user_name);
      form.append("password", this.password);
      this.loading.login1 = true;
      this.$post("/api1/login", form).then(res => {
        this.loading.login1 = false;
        console.log(res);
      });
    },
    login2() {
      const param = {
        user_name: this.user_name,
        password: this.password
      };
      this.loading.login2 = true;
      this.$post("/api2/login", param).then(res => {
        console.log(res);
        this.loading.login2 = false;
      });
    },
    login3() {
      const form = new FormData();
      form.append("user_name", this.user_name);
      form.append("password", this.password);
      this.$post("http://101.133.166.140:8080/v1/login", form).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.mb {
  margin-bottom: 12px;
  width: 100%;
}
.w {
  width: 20px;
}
.content {
  width: 300px;
  padding: 24px;
  box-sizing: border-box;
}
.home {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>
