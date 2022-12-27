<template>
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
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { Order, OrderGetParams } from '~/interfaces/orders'
import OrderItem from '~/components/OrderItem.vue'

@Component({
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    OrderItem
  }
})
export default class OrderPage extends Vue {
  @Getter('orders/items') orders!: Order[]

  @Action('orders/getOrders') getOrders!: (params?: OrderGetParams) => Promise<Order[]>

  mounted () {
    const params = {
      user_id: this.$auth.user?.id as string
    }
    this.getOrders(params)
  }
}
</script>