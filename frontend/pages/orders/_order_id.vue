<template>
  <Loading :loading="loading">
    <div v-if="order" class="order-id-page">
      <h2 class="page__header">Заказ №{{ order.id }}</h2>
      <div class="order-id-page__main">
        Статус заказа: <Label :title="order.status" />
        <div class="order-id-page__info">
          <div>
            <div class="order-id-page__address">
              Адрес доставки: <br/> <span class="order-id-page__info-item">{{ order.delivery_address }}</span>
            </div>
            <div class="order-id-page__date">
              Дата и время доставки: <br/> <span class="order-id-page__info-item">{{ order.delivery_date || '&mdash;' }} {{ order.delivery_time }}</span>
            </div>
            <div class="order-id-page__user">
              Получатель: <br/> <span class="order-id-page__info-item">{{ order.user.name }} <br/> {{ order.user.email }}</span>
            </div>
          </div>
          <div class="order-id-page__total">
            Сумма: <br/> <span class="order-id-page__info-item">{{ getTotalCost() }}</span>
          </div>
          <div class="order-id-page__checkout">
            <el-popconfirm
              title="Подтвердите повтор заказа"
              confirm-button-text="Подтверждаю"
              @confirm="repeatOrder()"
            >
              <el-button
                slot="reference"
                type="primary"
                size="mini"
              >
                Повторить заказ
              </el-button>
            </el-popconfirm>
          </div>
        </div>
        <div class="order-id-page__stuff">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="order-id-page__stuff-item order-stuff-item"
          >
            <div style="height: inherit">
              <el-image
                class="stuff-item__logo order-stuff-item__logo"
                :src="'https://orch.store/' + item.stuff.stuff_link"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="order-stuff-item__info">
              <p class="stuff-item__name">
                {{ item.stuff.name }}
              </p>
              <p class="stuff-item__cost">
                {{ item.stuff.cost }}
                {{ '&#8381;' }}
              </p>
              <p class="stuff-item__description">
                {{ item.stuff.description }}
              </p>
              <p class="stuff-item__count">
                {{ item.stuff.count_on_warehouse }} шт
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-if="!order">
      <el-button
        type="primary"
        size="mini"
        @click="$router.back()"  
      >
        Вернуться назад
      </el-button>
    </el-empty>
  </Loading>
</template>

<script lang="ts">
import { Action, Component, Vue } from 'nuxt-property-decorator'
import Loading from '~/components/Loading.vue'
import Label from '~/components/Label.vue'
import StuffItem from '~/components/StuffItem.vue'
import { Order } from '~/interfaces/orders'
import { getTotalCost } from '~/utils/cart'

@Component({
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    Loading,
    Label,
    StuffItem,
  }
})
export default class OrderItemPage extends Vue {

  @Action('orders/getOrder') getOrder!: (params: { id: string }) => Promise<Order>

  @Action('orders/addOrder') addOrder!: (params: Pick<Order, 'delivery_address'> & { items: number[] }) => Promise<Order>

  order: Order | null = null
  loading = false

  mounted () {
    this.loading = true
    const params = {
      id: this.$route.params.order_id,
    }
    this.getOrder(params)
    .then((response) => {
      this.order = response
    })
    .finally(() => {
      this.loading = false
    })
  }

  repeatOrder () {
    if (!this.order) return
    this.loading = true
    const params = {
      delivery_address: this.order.delivery_address,
      items: this.order.items.map((item) => item.id)
    }
    this.addOrder(params)
    .then((response) => {
      this.$router.push(`/orders/${response.id}`)
    })
    .finally(() => {
      this.loading = false
    })
  }

  getTotalCost () {
    if (!this.order) return
    return getTotalCost(this.order.items)
  }
}
</script>