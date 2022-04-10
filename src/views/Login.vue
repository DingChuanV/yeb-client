<template>
  <div>
    <!--表单数据的对象-->
    <el-form ref="LoginFrom" :model="login_form_data" class="login_container">
      <h3>系统登陆</h3>
      <el-form-item label="用户名" size="large">
        <el-input type="text" auto-complete="false" v-model="login_form_data.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" auto-complete="false" v-model="login_form_data.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" size="small">
        <el-input type="text" v-model="login_form_data.code" placeholder="点击按钮获取验证码"></el-input>
      <img :src="captchaUrl">
      <!-- <el-button @click="getCapter">获取验证码</el-button> -->
      </el-form-item>
      <el-checkbox v-model="checked">记住我</el-checkbox>
      <el-button type="primary" @click="doLogin" style="width:100%">登陆</el-button>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl:'',
      login_form_data: {
        username: 'admin',
        password: '123',
        code: ''
      }
    }
  },
  methods: {
    doLogin() {
      alert("ok！")
    },
    getCapter() {
      alert("123")
    }
  }
}
</script>

<style>
.login_containergin{

}

</style>