<template>
  <div class="layout">
    <background />
    <LayoutHeader />
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
    <el-col :span="24" class="flex-center">
      <el-col class="layout__content layout-content">
        <el-col class="layout-nuxt" :span="24">
          <nuxt />
        </el-col>
      </el-col>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { isAuth, isAdmin } from '~/utils/auth'
import { adminRoutes } from '~/utils/routes'
import LayoutHeader from '~/components/LayoutHeader.vue'

@Component({
  transition: 'slide-bottom',
  components: {
    LayoutHeader,
  }
})
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