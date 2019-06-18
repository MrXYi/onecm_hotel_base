<template>
  <div class="home-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminHome from "./admin";

export default {
  name: "Home",
  components: { adminHome },
  data() {
    return {
      currentRole: "adminHome"
    };
  },
  computed: {
    ...mapGetters([
      // 'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
};
</script>
