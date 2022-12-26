<template>
  <el-header class="layout__header layout-header">
    <h1 class="layout-header__name">
      <nuxt-link :to="'/'" class="text-decoration-none" style="color: inherit">
        orch.store
      </nuxt-link>
    </h1>
    <div class="layout-header__profile layout-header-profile">
      <nuxt-link v-if="isAuth()" :to="`/orders`">
        <el-badge :value="cart.length" :max="10">
          <el-button size="mini" class="layout-header-profile__orders">
            Заказы
          </el-button>
        </el-badge>
      </nuxt-link>
      <nuxt-link v-if="isAuth()" :to="`/cart`">
        <el-badge :value="cart.length" :max="10">
          <el-button size="mini" class="layout-header-profile__cart">
            Корзина
          </el-button>
        </el-badge>
      </nuxt-link>
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
      <nuxt-link :to="isAuth() ? `/profile` : `/login`">
        <el-button size="mini" class="layout-header-profile__login">
          {{ isAuth() ? 'Профиль' : 'Войти'}}
        </el-button>
      </nuxt-link>
      <div v-if="isAuth()">
        <el-avatar :size="40" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
      </div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue, Watch } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { isAuth, isAdmin } from '~/utils/auth'
import { adminRoutes } from '~/utils/routes'

@Component({})
export default class LayoutHeader extends Vue {

  @Getter('cart/items') cart!: CartItem[]

  @Action('cart/getCart') getCart!: () => Promise<CartItem[]>

  adminRoutes = adminRoutes

  mounted () {
    this.getCart()
  }

  isAuth () {
    return isAuth(this.$auth.user)
  }

  isAdmin () {
    return isAdmin(this.$auth.user)
  }

}
</script>