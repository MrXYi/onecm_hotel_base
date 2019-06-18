<template>
  <div class="app-container">
    <el-button>添加</el-button>
    <el-table :data="tableData" height="600" border>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <span>{{getCharacter(scope.row.character)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <span>{{getPermission(scope.row.character)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button @click="changePermission(row)">修改权限</el-button>
          <el-button @click="deleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      tableData: [
        { id: 1, character: 1, name: "Tom" },
        { id: 2, character: 1, name: "Tim" },
        { id: 3, character: 2, name: "Mark" }
      ]
    };
  },
  methods: {
    getCharacter(character) {
      var characterDsc = "未知人员";
      if (character == 1) {
        characterDsc = "维护人员";
      } else if (character == 2) {
        characterDsc = "前台";
      }
      return characterDsc;
    },
    getPermission(character) {
      var permissionDsc = "未知权限";
      if (character == 1) {
        permissionDsc = "登陆本系统可查看首页，登陆APP可操作当前酒店所有主机";
      } else if (character == 2) {
        permissionDsc = "登陆本系统可查看首页";
      }
      return permissionDsc;
    },
    changePermission(row) {},
    deleteUser(row) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
