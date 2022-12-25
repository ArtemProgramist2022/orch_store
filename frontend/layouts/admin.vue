<template>
  <el-container class="layout">
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name">
        <nuxt-link :to="'/'" class="text-decoration-none" style="color: #303133">
          orch.store
        </nuxt-link>
      </h1>
      <div class="layout-header__profile layout-header-profile">
        <nuxt-link v-if="isAdmin()" :to="`${routes.users}`">
          <el-button size="mini" class="layout-header-profile__admin-panel">
            Панель админа
          </el-button>
        </nuxt-link>
        <nuxt-link v-if="!isAuth()" :to="`/signup`">
          <el-button size="mini" class="layout-header-profile__register">
            Зарегистрироваться
          </el-button>
        </nuxt-link>
        <nuxt-link :to="`/login`">
          <el-button size="mini" class="layout-header-profile__login">
            {{ isAuth() ? 'Профиль' : 'Войти'}}
          </el-button>
        </nuxt-link>
        <div v-if="isAuth()">
          <el-avatar :size="40" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
        </div>
      </div>
    </el-header>
    <div class="categories">
      <nuxt-link
        v-for="category in categories"
        :key="category.id"
        :class="{
          'categories__category-item': true,
          'category-item': true,
          'category-item--active': activeTabAdmin === category.id
        }"
        :to="`${category.id}`"
      >
        <span class="category-item__name">
          {{ category.name }}
        </span>
      </nuxt-link>
    </div>
    <el-col class="layout__content layout-content">
      <el-col class="layout-nuxt" :span="24">
        <nuxt />
      </el-col>
    </el-col>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { isAuth, isAdmin } from '~/utils/auth'
import { adminRoutes } from '~/utils/routes'

@Component({})
export default class IndexLayoutAdmin extends Vue {
  activeTabAdmin = this.$route.path
  routes = adminRoutes
  categories = [
    {
      id: this.routes.users,
      name: 'Пользователи',
    },
    {
      id: this.routes.categories,
      name: 'Категории',
    },
    {
      id: this.routes.stuff,
      name: 'Товары',
    },
    {
      id: this.routes.orders,
      name: 'Заказы',
    }
  ]

  @Watch('$route.path')
  watchActiveTabAdmin () {
    this.activeTabAdmin = this.$route.path
  }

  isAuth () {
    return isAuth(this.$auth.user)
  }

  isAdmin () {
    return isAdmin(this.$auth.user)
  }

}
</script>