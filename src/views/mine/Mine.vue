<template>
  <div class="mine" v-if="userInfo">
    <v-app class="mine">
      <del-dailog :type="'login'" :status="dailog" @close="close" />
      <!-- 隐藏导航栏-->
      <v-app-bar
        inverted-scroll
        scroll-target=".container"
        absolute
        flat
        color="#fff"
        ref="nav"
      >
        <div class="mini-header" v-if="userInfo.avatarUrl">
          <v-img :src="userInfo.avatarUrl" />
        </div>
      </v-app-bar>
      <div class="container px-0 py-0" :scrollY="true" :probeType="3">
        <div class="cont">
          <div class="mine-top">
            <!-- 头像 -->
            <user-info :userInfo="userInfo" @show="show" />
            <!-- 喜欢的音乐 -->
            <like-list :userInfo="userInfo" />
          </div>
          <div class="mine-bottom">
            <my-playlist
              :sticky="sticky"
              @showDailog="showDailog"
              :addListInfo="addListInfo"
              @showBotSheet="showBotSheet"
              :removeList="removeStatus"
              :delId="delId"
              :type="type"
            />
          </div>
        </div>
      </div>
      <!--创建歌单弹出框 -->
      <v-dialog height="500" v-model="createList">
        <v-card>
          <v-toolbar flat>
            <v-btn depressed color="#fff" @click="cancel">取消</v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed color="#fff" @click="submit" :disabled="disable"
              >完成</v-btn
            >
          </v-toolbar>
          <v-card-title>
            <div class="card-title">创建歌单</div>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="歌单名称"
              filled
              rounded
              dense
              v-model="listName"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- 提示框 -->
      <tips
        :scesMessage="'歌单创建成功'"
        :errorMessage="'歌单创建失败'"
        :snackbar="snackbar"
        :status="createStatus"
      />
      <!-- 底部工作表 -->
      <v-bottom-sheet v-model="botSheetStatus" class="botSheet">
        <v-sheet rounded>
          <v-list-item v-if="type === 1">
            <!-- 工具栏dot按钮触发 -->
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-shape-square-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click.stop="addNewList"
              >创建新的歌单</v-list-item-content
            >
          </v-list-item>
          <!-- 歌单dot按钮触发 -->
          <v-list-item v-else>
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-delete-forever</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click.stop="delList"
              >删除此歌单</v-list-item-content
            >
          </v-list-item>
        </v-sheet>
      </v-bottom-sheet>
      <!-- 删除确认对话框 -->
      <del-dailog
        :status="delStatus"
        :delId="delId"
        @remove="remove"
        :type="'playlist'"
      />
    </v-app>
  </div>
</template>

<script>
import { createList } from "../../network/user";
import UserInfo from "./components/UserInfo.vue";
import LikeList from "./components/Likelist";
import MyPlaylist from "./components/MyPlaylist";
import NewScroll from "../../components/newScroll.vue";
import Tips from "../../components/Tips";
import DelDailog from "../../components/DelDailog.vue";
import { mapState } from "vuex";
export default {
  data: () => ({
    name: "mine",
    addFix: false,
    //用户信息
    profile: null,
    //css 固定
    sticky: false,
    //喜欢音乐模块
    likeMusic: null,
    //创建歌单显示/隐藏控制
    createList: false,
    //创建歌单提交按钮控制
    disable: true,
    //歌单名称
    listName: "",
    //创建歌单结果
    createStatus: false,
    //提示框是否显示
    snackbar: false,
    //添加的歌单数据
    addListInfo: null,
    //botSheet
    botSheetStatus: false,
    //底部工作栏类型
    type: 1,
    //删除对话框
    delStatus: false,
    //删除歌单id
    delId: null,
    //删除歌单
    removeStatus: false,
    dailog: false,
  }),
  methods: {
    show() {
      this.dailog = true;
    },
    close() {
      this.dailog = false;
    },
    //获取登陆状态及用户信息
    getProfile() {
      const { avatarUrl, nickname, signature, userId } = this.userInfo;
      this.profile = {
        avatarUrl,
        nickname,
        signature,
        userId,
      };
      // ''("profile", this.profile);
      this.$store.commit("setUserInfo", this.profile);
    },

    //获取当前滚动距离
    getScroll(event) {
      // ''("scrolling", event.target.scrollTop);
      if (event.target.scrollTop >= 202) {
        this.sticky = true;
      }
    },
    //显示创建歌单对话框
    showDailog(status) {
      // ''(status);
      this.createList = status.status;
    },

    //弹出框取消
    cancel() {
      this.createList = false;
    },

    //创建歌单提交
    async submit() {
      let data = await createList(this.listName);
      this.createList = false;
      //创建成功
      if (data.data.code === 200) {
        this.addListInfo = data.data.playlist;
        this.createStatus = true;
      } else {
        this.createStatus = false;
      }
      this.snackbar = true;
    },

    //底部工作表
    showBotSheet(status) {
      this.botSheetStatus = status.status;
      this.type = status.type;
      this.delId = status.id;
    },

    //底部工作表调出创建歌单对话框
    addNewList() {
      this.createList = true;
      this.botSheetStatus = false;
    },

    //调出删除歌单对话框
    delList() {
      this.delStatus = !this.delStatus;
      this.botSheetStatus = false;
    },

    //删除歌单
    remove() {
      this.removeStatus = !this.removeStatus;
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    cookies() {
      return document.cookie;
    },
  },

  components: { UserInfo, LikeList, MyPlaylist, NewScroll, Tips, DelDailog },

  watch: {
    listName(newValue, oldValue) {
      if (!!newValue) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.card-title {
  text-align: center;
  width: 100%;
  height: 100%;
}
.mine {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #efefef;
  overflow: auto;

  .mini-header {
    margin: auto;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
  }
}
</style>