<template>
  <div class="profile-page">
    <h2 class="page__header">{{ $auth.user.name }}</h2>
    <div class="profile-page__info-item">
      Email: {{ $auth.user.email }}
    </div>
    <div class="profile-page__info-item">
      Права администратора: {{ $auth.user.is_admin ? 'Есть' : 'Нет' }}
    </div>
    <div class="profile-page__main">
      <h3 class="page__header-h3">
        Активные заказы
      </h3>
      <div class="profile-page__orders">
        <order-item
          v-for="order in activeOrders"
          :key="order.id"
          :order="order"
          :cutStyle="true"
        />
        <el-empty v-if="!activeOrders.length" description="Нет активных заказов"></el-empty>
      </div>
    </div>
    <el-col class="profile-page__actions">
      <el-button
        size="mini"
      >
        Сменить пароль
      </el-button>
      <el-button
        type="danger"
        size="mini"
        @click="$auth.logout()"
      >
        Выйти
      </el-button>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import { Order, OrderStatus } from '~/interfaces/orders'
import OrderItem from '~/components/OrderItem.vue'

@Component({
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    OrderItem
  }
})
export default class ProfilePage extends Vue {
  @Getter('orders/items') orders!: Order[]

  get activeOrders () {
    return this.orders
    .filter((order) => order.status !== OrderStatus.DONE)
  }
}
</script>