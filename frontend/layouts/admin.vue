<template>
  <el-container class="layout">
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name cursor-pointer" @click="$router.push('/')">orch.store</h1>
      <div>
        <nuxt-link
          v-if="!this.$auth.user?.id"
          :to="'/login'"
          style="color: black;"
        >
          <fa-icon
            :icon="['fas', 'user']"
            class="cursor-pointer"
            style="font-size: 20px"
          />
        </nuxt-link>
        <el-dropdown v-else trigger="click">
          <span class="cursor-pointer">
            {{ this.$auth.user?.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">Профиль</el-dropdown-item>
            <el-dropdown-item
              v-if="this.$auth.user.is_admin"
              icon="el-icon-s-custom"
            >
              <nuxt-link :to="`${routes.users}`" class="text-decoration-none color-inherit">
                Панель админа
              </nuxt-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-col :span="24" class="layout__nuxt">
      <el-tabs v-model="activeTabAdmin" @tab-click="clickTabAdmin">
        <el-tab-pane label="Пользователи" :name="routes.users">
        </el-tab-pane>
        <el-tab-pane label="Товары" :name="routes.stuff">
        </el-tab-pane>
        <el-tab-pane label="Категории" :name="routes.categories">
        </el-tab-pane>
        <el-tab-pane label="Заказы" :name="routes.orders">
        </el-tab-pane>
      </el-tabs>
      <nuxt />
    </el-col>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { adminRoutes } from '~/utils/routes'

@Component({})
export default class IndexLayoutAdmin extends Vue {
  activeTabAdmin = this.$route.path
  routes = adminRoutes

  @Watch('$route.path')
  watchActiveTabAdmin () {
    this.activeTabAdmin = this.$route.path
  }

  clickTabAdmin () {
    this.$router.push(this.activeTabAdmin)
  }

}
</script>