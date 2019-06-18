<template>
  <div class="app-container">
    <div>
      推送广告
      <el-switch v-model="adState" style="margin-left:30px"></el-switch>
    </div>
    <div class="ad-content">
      广告内容
      <el-upload class="ad-upload"
        action="http://www.onecm.com.cn:8447/uploadBusinessLicence"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelSetting",
  data() {
    return {
      adState: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ad-content {
  margin-top: 30px;
}
.ad-upload {
  margin-top: 20px;
}
</style>
