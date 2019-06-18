<template>
  <div class="app-container">
    <div class="filter-container"></div>

    <el-table :data="tableData" height="600" border>
      <el-table-column label="主题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{getStateDsc(scope.row.state)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "NotificationCenter",
  data() {
    return {
      tableData: [
        { id: 1, title: "系统升级", date: "2019-06-11", state: 0 },
        { id: 2, title: "系统升级", date: "2019-06-11", state: 0 },
        { id: 3, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 4, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 5, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 6, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 7, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 8, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 9, title: "系统升级", date: "2019-06-11", state: 1 },
        { id: 10, title: "系统升级", date: "2019-06-11", state: 1 }
      ]
    };
  },
  methods: {
    getStateDsc(state) {
      var stateDsc = "未读";
      if (state == 1) {
        stateDsc = "已读";
      }
      return stateDsc;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
