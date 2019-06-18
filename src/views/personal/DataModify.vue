<template>
  <div class="app-container">
    <el-form label-position="left" label-width="120px" class="data-modify-form">
      <el-form-item label="企业名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="营业执照注册号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="上传营业执照">
        <el-upload
          list-type="picture-card"
          class="avatar-uploader"
          action="http://www.onecm.com.cn:8447/uploadBusinessLicence"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="法人姓名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="functionBlock">
        <el-select placeholder="请选择证件类型">
          <el-option label="身份证" value="func_1"></el-option>
          <el-option label="护照" value="func_2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DataModify",
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.data-modify-form {
  max-width: 600px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
