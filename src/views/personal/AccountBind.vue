<template>
  <div class="app-container">
    <el-form label-position="left" label-width="120px" class="account-bind-form">
      <el-form-item label="管理员手机号">
        <el-input class="account-bind-phone" :disabled="true" v-model="phone"></el-input>
        <el-button
          class="account-bind-change-phone"
          type="text"
          @click="dialogPhoneVisible = true"
        >修改</el-button>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input class="account-bind-mail" :disabled="true" v-model="mail"></el-input>
        <el-button class="account-bind-change-mail" type="text" @click="dialogMailVisible = true">修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="修改手机号" :visible.sync="dialogPhoneVisible" width="50%" center>
      <el-form label-position="left" label-width="60px">
        <el-form-item label="手机号">
          <el-input class="dialog-change-phone"></el-input>
          <el-button class="send-verify-code">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="dialog-verify-code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPhoneVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改邮箱" :visible.sync="dialogMailVisible" width="50%" center>
      <el-form label-position="left" label-width="60px">
        <el-form-item label="邮箱">
          <el-input class="dialog-change-phone"></el-input>
          <el-button class="send-verify-code">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="dialog-verify-code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMailVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogMailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      phone: "132****6888",
      mail: "919118325@qq.com",
      dialogPhoneVisible: false,
      dialogMailVisible: false
    };
  },
  methods: {
    changePhone() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.account-bind-form {
  max-width: 600px;
  .account-bind-phone {
    width: 200px;
  }
  .account-bind-change-phone {
    margin-left: 10px;
  }
  .account-bind-mail {
    width: 200px;
  }
  .account-bind-change-mail {
    margin-left: 10px;
  }
}
.dialog-change-phone {
  max-width: 50%;
}
.dialog-verify-code {
  max-width: 30%;
}
.send-verify-code {
  margin-left: 10px;
}
</style>
