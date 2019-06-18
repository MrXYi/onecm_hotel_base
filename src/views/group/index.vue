<template>
  <div class="app-container">
    <el-button>添加</el-button>
    <el-table :data="tableData" height="600" border>
      <el-table-column label="酒店名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员">
        <template slot-scope="scope">
          <span>{{scope.row.admin}}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营状态">
        <template slot-scope="scope">
          <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button>查看</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "GroupManage",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "酒店A",
          address: "深圳市福田区",
          admin: "小明",
          state: "运营中"
        },
        {
          id: 2,
          name: "酒店B",
          address: "深圳市南山区",
          admin: "小李",
          state: "运营中"
        },
        {
          id: 3,
          name: "酒店C",
          address: "深圳市龙岗区",
          admin: "小王",
          state: "运营中"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
