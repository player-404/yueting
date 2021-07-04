<template>
  <div class="login">
    <div class="top">
      <v-icon color="#606060" class="pl-4 pt-4" @click.stop="back"
        >mdi-arrow-left</v-icon
      >
    </div>
    <!-- 消息框 -->
    <tips
      :status="loginStatus"
      :scesMessage="'登陆成功'"
      :errorMessage="'登陆失败'"
      :snackbar="snackbar"
      @newStatus="setNewStatus"
    />
    <!-- 登陆主体 -->
    <div class="cont">
      <div class="icon d-flex justify-center align-center">
        <div class="icon-cover">
          <img src="@/assets/netease-music.png" class="icon-img" />
        </div>
      </div>
      <div class="title py-4">登陆网易云账号</div>
      <v-text-field
        ref="account"
        label="手机号"
        placeholder="请输入手机号"
        v-model="phoneNumber"
        :rules="[rules.required, rules.number]"
        filled
        rounded
        dense
        required
      ></v-text-field>
      <v-text-field
        :type="'password'"
        ref="passWorld"
        label="密码"
        placeholder="请输入密码"
        v-model="pass"
        :rules="[() => !!pass || '密码不能为空']"
        filled
        rounded
        dense
        required
      ></v-text-field>
      <!-- 登陆按钮 -->
      <div class="submit-btn py-2 d-flex justify-center">
        <v-btn
          rounded
          color="blue lighten-1"
          dark
          width="80%"
          large
          depressed
          :loading="loading"
          @click="submit"
        >
          登陆
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { login, loginStatus } from "../network/user";

import { getCookie, setCookie} from "../utils/cookie";
import Tips from "../components/Tips";
import { account } from "../network/user";
export default {
  name: "login",
  components: { Tips },
  data: () => ({
    phoneNumber: "",
    pass: "",
    loading: false,
    rules: {
      required: (value) => !!value || "手机号不能为空",
      number: (value) =>
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
          value
        ) || "手机号不符合规则",
    },
    snackbar: false,
    loginStatus: false,
  }),
  beforeCreate() {
    this.$store.commit("closeNav", true);
  },
  beforeDestroy() {
    this.$store.commit("closeNav", false);
  },
  methods: {
    back() {
      this.$router.push({ name: "music" });
    },
    //登陆
    submit() {
      this.loading = true;
      this.login = true;

      //手机密码为空触发错误
      let accountStatus = !!this.phoneNumber;
      let passStatus = !!this.pass;
      if (!accountStatus || !passStatus) {
        this.$refs.account.validate(!accountStatus);
        this.$refs.passWorld.validate(!passStatus);
        this.loading = false;
        return;
      }

      //提交数据
      // ''("手机号", this.phoneNumber, "密码", this.pass);
      this.loginCheck(this.phoneNumber, this.pass);
    },

    //登陆验证
    async loginCheck(account, password) {
      const data = await login(account, password);
      // ''("请求数据", data);
      let statusCode = data.data.code;
      let cookie = data.data.cookie;
      //成功登陆
      if (statusCode === 200) {
        //没有获取到ciookie 登陆失败
        if (!cookie) {
          this.loginStatus = false;
          this.snackbar = true;
          this.loading = false;
          return;
        }
        //获取cookie
        let cookieArr = getCookie(cookie);
        //设置cookie
        setCookie(cookieArr);
        //激活loding按钮
        this.loginStatus = true;
        this.$store.commit("setLoginStatus", true);
        this.setProfile();
        //登陆成功跳转至 我的 页面
        this.$router.push({ name: "mine" });
        //登陆失败
      } else {
        this.loginStatus = false;
      }
      this.snackbar = true;
      this.loading = false;
    },
    setNewStatus(status) {
      this.snackbar = status;
    },
    async setProfile() {
      const data = await account();
      this.$store.commit("setUserInfo", data.data.profile);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  .cont {
    position: fixed;
    width: 20rem;
    height: 25rem;
    top: 0;
    left: 0;
    margin: auto;
    right: 0;
    bottom: 0;
    .icon {
      width: 100%;
      .icon-cover {
        width: 64px;
        height: 64px;
        border-radius: 14px;
        overflow: hidden;
        .icon-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .title {
      text-align: center;
    }
    .submit-btn {
      width: 100%;
    }
  }
}
</style>