<template>
  <el-container class="layout">
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name">
        <nuxt-link :to="'/'" class="text-decoration-none" style="color: #303133">
          orch.store
        </nuxt-link>
      </h1>
      <div class="layout-header__profile layout-header-profile">
        <nuxt-link v-if="isAdmin()" :to="`${adminRoutes.users}`">
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
        v-for="category in categories.filter((_, index) => index <= 6)"
        :key="category.id"
        :class="{
          'categories__category-item': true,
          'category-item': true,
          'category-item--active': category.id === +$route.params.category_id
        }"
        :to="`/category/${category.id}`"
      >
        <span class="category-item__name">
          {{ category.name }}
        </span>
      </nuxt-link>
    </div>
    <el-col class="layout__content layout-content">
      <el-col
        class="layout-content__menu"
        :span="6"
      >
        <el-tree
          :data="treeData"
          :props="treeProps"
          @node-click="clickTreeCategories"
          :render-content="renderContentTree"
        />
      </el-col>
      <el-col class="layout-nuxt" :span="18">
        <nuxt />
      </el-col>
    </el-col>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Action, Getter, Watch } from 'nuxt-property-decorator'
import { isAuth, isAdmin } from '~/utils/auth'
import { CategoryItem } from '~/interfaces/categories'
import { adminRoutes } from '~/utils/routes'
import { CreateElement } from 'vue/types/umd';

@Component({
  transition: 'slide-bottom'
})
export default class MainLayout extends Vue {

  @Getter('categories/items') categories!: CategoryItem[]

  @Action('categories/getCategories') getCategories!: () => Promise<CategoryItem[]>

  @Watch('categories')
  watchCategories () {
    this.treeData[0].children = this.categories
  }

  @Watch('$route.path')
  watchRoutePath () {
    const category = this.categories.find((category) => {
      return category.id === +this.$route.params.category_id
    })
    if (!category) return
    this.clickTreeCategories(category)
  }

  treeProps = {
    children: 'children',
    label: 'name'
  }
  treeData: { name: string, children: CategoryItem[] }[] = [
    {
      name: 'Все категории',
      children: this.categories
    }
  ]
  adminRoutes = adminRoutes

  isAuth () {
    return isAuth(this.$auth.user)
  }

  isAdmin () {
    return isAdmin(this.$auth.user)
  }

  mounted () {
    this.getCategories()
  }

  clickTreeCategories (node: { name: string, children: CategoryItem[] }[] | CategoryItem) { // typeof this.treeData - some problem with build
    if (!Object.hasOwnProperty.call(node, 'children')) {
      this.categories.forEach((category) => {
        if ((document.querySelector(`#node-id-${category.id}`) as HTMLElement)) {
          (document.querySelector(`#node-id-${category.id}`) as HTMLElement).style.color = ""
        }
      });
      if ((document.querySelector(`#node-id-${(node as CategoryItem).id}`) as HTMLElement)) {
        (document.querySelector(`#node-id-${(node as CategoryItem).id}`) as HTMLElement).style.color="#409EFF"
      }
      this.$router.push(`/category/${(node as CategoryItem).id}`)
    } else {
      const category = this.categories.find((category) => {
        return category.id === +this.$route.params.category_id
      })
      if (!category) return
      setTimeout(() => {
        if ((document.querySelector(`#node-id-${category.id}`) as HTMLElement)) {
          (document.querySelector(`#node-id-${category.id}`) as HTMLElement).style.color="#409EFF"
        }
      })
    }
  }

  renderContentTree (h: CreateElement, { data }: { data: CategoryItem }) {
    let btn = h('span', {
      props: { type: 'success' },
      domProps: {
        innerHTML: data.name,
        id: "node-id-" + data.id
      }
    })
    return btn
  }
}
</script>
