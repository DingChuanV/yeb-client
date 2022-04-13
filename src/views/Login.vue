<template>
  <div>
    <!--v-model是vue.js中内置的双向数据绑定-->
    <!--v-bind:model="" 相当于 :model="" 这种只是将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定。-->
    <!--:model表单数据的对象-->
    <!--rules表单验证规则 当然也可以自定义:model="login_rule_from"-->
    <el-form v-bind:rules="rules"
             ref="LoginFrom"
             :model="LoginFrom"
             id="login_container">
      <h3 id="login_title">云E办管理系统登陆</h3>
      <!--prop 才能和校验规则对应上-->
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false"
                  v-model="LoginFrom.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="LoginFrom.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input type="text" v-model="LoginFrom.code" placeholder="点击按钮获取验证码"
                  style="width: 250px;margin-right: 5px"></el-input>
        <img v-bind:src="captchaUrl" @click="updateCap">
      </el-form-item>
      <el-checkbox v-model="checked" id="login_rem">记住我</el-checkbox>
      <el-button type="primary" @click="doLogin" style="width:100%">登陆</el-button>
    </el-form>
  </div>

</template>

<script>
import {postRequest} from "@/utils/axios";

export default {
  name: "Login",
  data() {
    return {
      //new Date可以根据不同时间点击更换图片
      captchaUrl: '/captcha?time=' + new Date(),
      LoginFrom: {
        username: 'admin',
        password: '123',
        code: ''
      },
      checked: true,
      //使用默认的校验规则
      rules: {
        //trigger:'blur' 失去焦点的时候触发
        username: [{required: true, message: '请输入用户名！', trigger: 'blur'},
          {min: 3, max: 15, message: "长度在3-15之间", trigger: 'blur'}
        ],
        password: [{required: true, message: '请输入密码！', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码！', trigger: 'blur'}]
      },
    }
  },
  methods: {
    doLogin() {
      //1.校验数据的合法性
      // this.$refs["LoginFrom"].validate((valid)=>{
      this.$refs.LoginFrom.validate((valid) => {
        if (valid) {
          postRequest('/login',this.LoginFrom).then(resp=>{
            //resp是后端给我们返回的一个JSON对象
            //alert(JSON.stringify(resp));
            if (resp){
              //this.$router.replace() 在后端相当于重定向 是不可以回退的
              //this.$router.push() 在后端相当与转发的效果 是可以回退的
              this.$router.replace("/home");
            }
          })
        } else {
          this.$message.error("请输入所有的字段！")
          return false;
        }
      })
      //2.跳转页面
    },
    updateCap() {
      this.captchaUrl = '/captcha?time=' + new Date();
    }

  },

}
</script>

<style>
#login_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

#login_title {
  margin: 0px auto 40px auto;
  text-align: center;
}

#login_rem {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}

</style>