<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="test">测试token</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserProfile } from '@/api/user'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // console.log(this.$store.getters['user/myname'])
    console.log(this.$store.getters.device)
  },
  methods: {
    async test() {
      const res = await getUserProfile()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
