<template>
  <el-header class="layout__header layout-header">
    <h1 class="layout-header__name" :style="!$device.isDesktop && { fontSize: '18px', lineHeight: 'normal' }">
      <nuxt-link :to="'/'">
        Главная
      </nuxt-link>
    </h1>
    <div class="layout-header__profile layout-header-profile">
      <nuxt-link v-if="isAuth()" :to="`/orders`">
        <el-badge :value="orders.length" :max="10">
          <el-button v-if="$device.isDesktopOrTablet" size="small" class="layout-header-profile__orders">
            Заказы
          </el-button>
          <i v-else class="color-white el-icon-box layout-header-profile__orders" />
        </el-badge>
      </nuxt-link>
      <nuxt-link v-if="isAuth()" :to="`/cart`">
        <el-badge :value="cart.length" :max="10">
          <el-button v-if="$device.isDesktopOrTablet" size="small" class="layout-header-profile__cart">
            Корзина
          </el-button>
          <i v-else class="color-white el-icon-shopping-cart-2 layout-header-profile__cart" />
        </el-badge>
      </nuxt-link>
      <nuxt-link v-if="isAdmin()" :to="`${adminRoutes.users}`">
        <el-button v-if="$device.isDesktopOrTablet" size="small" class="layout-header-profile__admin-panel">
          Панель админа
        </el-button>
        <i v-else class="color-white el-icon-user-solid layout-header-profile__admin-panel" />
      </nuxt-link>
      <nuxt-link v-if="!isAuth() && $device.isDesktopOrTablet" :to="`/signup`">
        <el-button size="small" class="layout-header-profile__register">
          Зарегистрироваться
        </el-button>
      </nuxt-link>
      <nuxt-link :to="isAuth() ? `/profile` : `/login`">
        <el-button size="small" class="layout-header-profile__login">
          {{ isAuth() ? 'Профиль' : 'Войти'}}
        </el-button>
      </nuxt-link>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { Order, OrderGetParams } from '~/interfaces/orders'
import { isAuth, isAdmin } from '~/utils/auth'
import { adminRoutes } from '~/utils/routes'

@Component({})
export default class LayoutHeader extends Vue {

  @Getter('cart/items') cart!: CartItem[]

  @Getter('orders/items') orders!: Order[]

  @Action('cart/getCart') getCart!: () => Promise<CartItem[]>

  @Action('orders/getOrders') getOrders!: (params?: OrderGetParams) => Promise<Order[]>

  adminRoutes = adminRoutes

  mounted () {
    if (!this.$auth.user?.id) return
    const orderParams = {
      user_id: this.$auth.user?.id as string
    }
    this.getCart()
    this.getOrders(orderParams)
  }

  isAuth () {
    return isAuth(this.$auth.user)
  }

  isAdmin () {
    return isAdmin(this.$auth.user)
  }

}
</script>