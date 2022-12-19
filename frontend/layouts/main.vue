<template>
  <el-container class="layout">
    <el-header class="layout__header layout-header">
      <div>
        <fa-icon
          :icon="['fas', 'search']"
          class="cursor-pointer"
          style="font-size: 20px"
          @click="changeMenuState(true)"
        />
      </div>
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
      <nuxt />
    </el-col>
    <el-footer class="layout__footer layout-footer">
      <div class="layout-footer__reviews">
        <el-rate
          v-model="rate"
          disabled
          text-color="#FDD017"
        />
        <span style="color: #696969">Наши отзывы</span>
      </div>
      <div>
        <span style="color: #696969">связь</span>
        8-999-939-93-23
      </div>
    </el-footer>
    <div
      :class="{
        'layout-menu__wrapper': true,
        'layout-menu__wrapper--show': showMenu
      }"
      @click="changeMenuState(false)"
    ></div>
    <div
      :class="{
        layout__menu: true,
        'layout-menu': true,
        'layout-menu--show': showMenu
      }"
    >
      <el-input
        v-model="searchCaterogiesValue"
        placeholder="Поиск"
        @input="searchCategories"
        clearable
      />
      <h3 class="layout-menu__catalog-header">Каталог</h3>
      <div class="layout-menu__catalog menu-catalog">
        <div
          v-for="category in searchCategoriesItems"
          :key="category.id"
          class="menu-catalog__item"
        >
          <nuxt-link
            class="menu-catalog__item-link"
            :to="`/category/${category.id}`"
          >
            {{ category.name }}
          </nuxt-link>
        </div>
        <div
          v-if="!searchCategoriesItems.length"
        >
          <p class="menu-catalog__item--no-categories">
            Нет категорий
          </p>
        </div>
      </div>
      <div class="extra-catalog">
        <div class="extra-catalog__item">
          <nuxt-link
            to="/login"
            class="text-decoration-none color-inherit"
          >
            Войти
          </nuxt-link>
      </div>
        <div class="extra-catalog__item">Нужна помощь?</div>
      </div>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Action, Getter, Watch } from 'nuxt-property-decorator'
import { CategoryItem } from '~/interfaces/categories'
import { adminRoutes } from '~/utils/routes'

@Component({})
export default class MainLayout extends Vue {

  @Getter('categories/items') categories!: CategoryItem[]

  @Action('categories/getCategories') getCategories!: () => Promise<CategoryItem[]>

  @Watch('categories')
  watchSearchCategories () {
    this.setSearchCategories(this.categories)
  }

  routes = adminRoutes
  rate = 4.5
  showMenu = false
  searchCategoriesItems: CategoryItem[] = []
  searchCaterogiesValue = ''

  mounted () {
    this.getCategories()
  }

  changeMenuState (status: boolean) {
    this.showMenu = status
  }

  searchCategories () {
    if (!this.searchCaterogiesValue)  {
      this.setSearchCategories(this.categories)
      return
    }
    const filteredCategories = this.searchCategoriesItems.filter((category) => category.name.includes(this.searchCaterogiesValue))
    this.setSearchCategories(filteredCategories)
  }

  setSearchCategories (categories: CategoryItem[]) {
    this.searchCategoriesItems = categories
  }

  changeCategoriesSearch (category: CategoryItem) {
    console.log(category);
  }
}
</script>

<style>
:root {
  --layout-menu-width: 300px;
  --layout-menu-padding: 15px;
}

.layout__nuxt {
  padding: 10px 20px;
}

.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px !important;
  background: rgba(255, 255, 255, .85);
  border-top: 3px solid #C21807;
  border-bottom: 1px solid black;
  padding: 15px;
}

.layout-header__name {
  position: relative;
  border-right: 3px solid black;
  border-left: 3px solid black;
  padding: 0 15px;
  margin: 0;
  font-size: 26px;
}

.layout-header__name::after, .layout-header__name::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 20px;
  background: black;
}

.layout-header__name::after {
  right: -10px;
}

.layout-header__name::before {
  left: -10px;
}

.layout__footer {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #C21807;
}

.layout-footer__reviews {
  display: flex;
  justify-content: center;
}

.layout-menu__wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, .5);
  transform: translateX(-100%);
}

.layout-menu__wrapper--show {
  transform: translateX(0);
}

.layout__menu {
  width: var(--layout-menu-width);
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc((var(--layout-menu-width) + var(--layout-menu-padding) * 2) * -1);
  z-index: 1001;
  padding: var(--layout-menu-padding);
  background-color: #f5f5f5;
  transition: left 250ms;
}

.layout-menu--show {
  left: 0;
}

.layout-menu__catalog-header {
  color: #c21807;
  padding: 10px 0px 5px 0px;
}

.layout-menu__catalog {
  padding-left: var(--layout-menu-padding);
  font-size: 18px;
  padding-bottom: 20px;
}

.menu-catalog__item {
  padding: 5px 0 5px 10px;
  cursor: pointer;
  transition: scale 250ms;
}

.menu-catalog__item:hover {
  scale: 1.1;
}

.menu-catalog__item-link {
  color: #696969;
  font-size: 16px;
  text-decoration: none;
}

.menu-catalog__item--no-categories {
  color: #696969;
  font-size: 16px;
}

.extra-catalog {
  padding: 5px 0 0 10px;
  border-top: 1px solid #696969;
}

.extra-catalog__item {
  color: #696969;
  padding-bottom: 5px;
  cursor: pointer;
}

</style>
