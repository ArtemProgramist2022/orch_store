<template>
  <div
    class="order-item"
    @click="goToOrder(order.id)"
  >
    <div class="order-item__header">
      <div>Дата доставки: {{ getDate(order.delivery_date) || '&mdash;' }} {{ order.delivery_time }}</div>
      <div>Стоимость: {{ getTotalCost(order.items) }} <span v-html="getRuble()"></span></div>
    </div>
    <div class="order-item__main">
      <div class="order-item__status">
        <span class="order-item__status-text">Статус заказа:</span>
        <Label :title="order.status" />
      </div>
      <div class="order-item__stuff">
        <div
          v-for="item in getStuffInOrder(order)"
          :key="item.id"
          class="order-item__stuff-item"
        >
          <el-image
            :src="'https://orch.store/' + (item.stuff ? item.stuff.stuff_link : '')"
            style="height: inherit"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div v-if="cutStyle && getCutItemsLength(order) > 0" class="color-primary">и еще {{ getCutItemsLength(order) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { Order } from '~/interfaces/orders'
import { getTotalCost } from '~/utils/cart'
import { getRuble } from '~/utils/helpers'
import Label from '~/components/Label.vue'
import { getDate } from '~/utils/date'

@Component({
  transition: 'slide-bottom',
  components: {
    Label,
  }
})
export default class OrderItem extends Vue {

  @Prop({ required: true }) order!: Order
  @Prop({ default: false }) cutStyle!: boolean

  getTotalCost (items: CartItem[]) {
    return getTotalCost(items)
  }

  getRuble () {
    return getRuble()
  }

  goToOrder (id: string) {
    this.$router.push(`orders/${id}`)
  }

  getStuffInOrder (order: Order) {
    if (order.items.length) return (this.cutStyle ? [order.items[0]] : order.items)
    return []
  }

  getCutItemsLength (order: Order) {
    if (order.items.length) return order.items.length - 1
    return 0
  }

  getDate (str: string, server_format = false) {
    return getDate(str, server_format)
  }
}
</script>