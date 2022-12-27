<template>
  <div class="checkout-page">
    <h2 class="checkout-page__header">Оформление заказа</h2>
    <div class="checkout-page__main">
      <el-col :span="18">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          size="mini"
          label-position="top"
        >
          <el-form-item
            label="Адрес доставки"
            prop="delivery_address"
          >
            <el-input
              v-model="form.delivery_address"
              placeholder="Укажите адрес доставки"
            />
          </el-form-item>
          <el-form-item label="Товары">
            <div class="checkout-page__stuff">
              <div
                v-for="item in form.items"
                :key="item.id"
                class="checkout-page__stuff-item"
              >
                <el-image
                  :src="'https://orch.store/' + (item.stuff ? item.stuff.stuff_link : '')"
                  style="border-radius: inherit; height: 100px;"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <span class="checkout-page__stuff-cost">{{ getCostItem(item) }} {{ '&#8381;' }}</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="checkout-page__checkout">
        <el-button
          type="success"
          size="large"
          :disabled="!cart.length"
          @click="createOrder()"
        >
          Оформить заказ
        </el-button>
        <h4 class="cart-page__total-cost">
          Итого: {{ getTotalCost() }} {{ '&#8381;' }}
        </h4>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Component, Getter, Action, Ref, Vue, Watch } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { Order } from '~/interfaces/orders'
import { getTotalCost } from '~/utils/cart'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
})
export default class CheckoutPage extends Vue {
  
  @Ref('form') formRef!: ElForm

  @Getter('cart/items') cart!: CartItem[]

  @Action('orders/addOrder') addOrder!: (params: Pick<Order, 'delivery_address'> & { items: number[] }) => Promise<Order>
  
  @Watch('cart')
  watchCart () {
    this.form.items = this.cart
  }

  mounted () {
    this.form.items = this.cart
  }

  form = {
    delivery_address: '',
    items: this.cart,
  }
  rules = {
    delivery_address: [{
      required: true, message: 'Укажите адрес доставки', trigger: 'blur'
    }],
  }

  createOrder () {
    this.formRef.validate((valid) => {
      if (!valid) return
      const params = {
        ...this.form,
        items: this.form.items.map((item) => item.id)
      }
      this.addOrder(params)
      .then((response) => {
        this.$router.push(`/orders/${response.id}`)
      })
    })
  }

  getCostItem (item: CartItem) {
    return item.stuff_count * (item.stuff?.cost || 0)
  }

  getTotalCost () {
    return getTotalCost(this.cart)
  }
}
</script>