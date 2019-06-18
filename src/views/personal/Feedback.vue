<template>
  <div class="app-container">
    <el-form
      :model="feedbackForm"
      :rules="feedbackRules"
      ref="feedbackForm"
      label-width="100px"
      class="feeback-form"
    >
      <el-form-item label="功能模块" prop="functionBlock">
        <el-select v-model="feedbackForm.functionBlock" placeholder="请选择功能模块">
          <el-option label="智能设备" value="func_1"></el-option>
          <el-option label="后台系统" value="func_2"></el-option>
          <el-option label="其它" value="func_3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题描述" prop="desc">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="feedbackForm.desc"
          maxlength="600"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contactWay">
        <el-radio-group v-model="feedbackForm.contactWay">
          <el-radio :label="1">邮箱</el-radio>
          <el-radio :label="2">手机号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="feedbackForm.contactWay == 1" label="联系邮箱" prop="contactMail">
        <el-input v-model="feedbackForm.contactMail"></el-input>
      </el-form-item>
      <el-form-item v-else-if="feedbackForm.contactWay == 2" label="联系手机" prop="contactPhone">
        <el-input v-model="feedbackForm.contactPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('feedbackForm')">提交</el-button>
        <el-button @click="resetForm('feedbackForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      feedbackForm: {
        functionBlock: "",
        desc: "",
        contactWay: 1
      },
      feedbackRules: {
        functionBlock: [
          { required: true, message: "请选择功能模块", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写问题描述", trigger: "blur" },
          { max: 6, message: "最多输入600个字符", trigger: "blur" }
        ],
        contactWay: [
          { required: true, message: "请选择联系方式", trigger: "change" }
        ],
        contactMail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    descInput() {
      var txtVal = this.feedbackForm.desc.length;
      this.remnant = txtVal;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.feeback-form {
  max-width: 600px;
}
</style>
