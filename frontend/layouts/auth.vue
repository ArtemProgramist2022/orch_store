<template>
  <el-container class="layout">
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name">
        <nuxt-link :to="'/'" class="text-decoration-none" style="color: #303133">
          orch.store
        </nuxt-link>
      </h1>
    </el-header>
    <el-col class="layout-content layout-nuxt layout-auth-nuxt" :span="24">
      <nuxt />
    </el-col>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { isAuth } from '~/utils/auth'

@Component({
  transition: 'slide-bottom'
})
export default class MainLayout extends Vue {
  isAuth () {
    return isAuth(this.$auth.user)
  }
}
</script>
  