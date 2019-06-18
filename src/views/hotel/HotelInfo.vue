<template>
  <div class="app-container">
    <el-row>
      酒店地理位置：
      <el-input class="hotel-address" v-model="hotelAddress" :disabled="true"></el-input>
    </el-row>
    <el-row>
      酒店所属集团：
      <el-input class="hotel-group" v-model="hotelGroup" :disabled="true"></el-input>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HotelInfo",
  data() {
    return {
      hotelAddress: "深圳市福田区八卦岭工业区八卦三路426栋",
      hotelGroup: "壹厘米科技"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hotel-address {
  width: 300px;
}
.hotel-group {
  width: 300px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
