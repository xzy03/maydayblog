<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <!-- 登录表单 -->
      <el-form
        status-icon
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="用户名"
            @keyup.enter="login"
          />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont el-icon-mymima"
            show-password
            placeholder="密码"
            @keyup.enter="login"
          />
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { generaMenu } from "../../assets/js/menu";
import config from "../../config/config";

export default {
  name: 'LoginView', // 修改为多单词组件名
  data: function() {
    return {
      config,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const that = this;
          // eslint-disable-next-line no-undef
          var captcha = new TencentCaptcha(
            this.config.TENCENT_CAPTCHA,
            function(res) {
              if (res.ret === 0) {
                //发送登录请求
                let param = new URLSearchParams();
                param.append("username", that.loginForm.username);
                param.append("password", that.loginForm.password);
                that.axios.post("/api/login", param).then(({ data }) => {
                  if (data.flag) {
                    // 登录后保存用户信息
                    that.$store.commit("login", data.data);
                    // 加载用户菜单
                    generaMenu();
                    that.$message.success("登录成功");
                    that.$router.push({ path: "/" });
                  } else {
                    that.$message.error(data.message);
                  }
                });
              }
            }
          );
          // 显示验证码
          captcha.show();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url("@/assets/img/6.jpg") center center /
    cover no-repeat;
}
.login-card {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  padding: 170px 60px 180px;
  width: 350px;
}
.login-title {
  color: #303133;
  font-weight: bold;
  font-size: 1rem;
}
.login-form {
  margin-top: 1.2rem;
}
.login-card button {
  margin-top: 1rem;
  width: 100%;
}
</style>
