<template>
  <Loading :loading="loading">
    <div class="orders-page">
      <h2 class="page__header">Заказы</h2>
      <div class="orders-page__main">
        <order-item
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
        <el-empty v-if="!orders.length" description="Нет заказов"></el-empty>
      </div>
    </div>
  </Loading>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { Order, OrderGetParams } from '~/interfaces/orders'
import OrderItem from '~/components/OrderItem.vue'
import Loading from '~/components/Loading.vue'

@Component({
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    OrderItem,
    Loading
  }
})
export default class OrderPage extends Vue {
  @Getter('orders/items') orders!: Order[]

  @Action('orders/getOrders') getOrders!: (params?: OrderGetParams) => Promise<Order[]>

  loading = false

  mounted () {
    this.loading = true
    const params = {
      user_id: this.$auth.user?.id as string
    }
    this.getOrders(params)
    .finally(() => {
      this.loading = false
    })
  }
}
</script>