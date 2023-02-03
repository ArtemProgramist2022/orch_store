<template>
  <div>
    <el-button
      v-if="!getStuffInCart()"
      type="primary"
      size="small"
      @click.stop="addStuffToCart()"
    >
      Купить
    </el-button>
    <el-input-number
      v-else
      :value="getCountStuffInCart()"
      size="small"
      :min="0"
      :max="stuffItem.count_on_warehouse"
      @change="changeCountStuffInCart($event)"
      @click.stop
      class="stuff-item__count-change"
    />
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Prop, Vue } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { StuffItem } from '~/interfaces/stuff'

@Component({})
export default class StuffActions extends Vue {
  
  @Prop({ required: true }) stuffItem!: StuffItem

  @Getter('cart/items') cart!: CartItem[]

  @Action('cart/addItemToCart') addItemToCart!: (params: Pick<CartItem, 'stuff_id' | 'stuff_count'>) => Promise<CartItem>
  @Action('cart/updateCountItemInCart') updateCountItemInCart!: (params: Pick<CartItem, 'stuff_count' | 'id'>) => Promise<CartItem>
  @Action('cart/deleteItemFromCart') deleteItemFromCart!: (params: Pick<CartItem, 'id'>) => Promise<CartItem>

  addStuffToCart () {
    const params = {
      stuff_id: this.stuffItem.id,
      stuff_count: 1,
    }
    this.addItemToCart(params)
  }

  changeCountStuffInCart (stuff_count: number) {
    const stuffInCart = this.cart.find((item) => item.stuff_id === this.stuffItem.id)
    if (!stuffInCart) return
    if (stuff_count > 0) {
      const params = {
        id: stuffInCart.id,
        stuff_count,
      }
      this.updateCountItemInCart(params)
    } else {
      const params = {
        id: stuffInCart.id
      }
      this.deleteItemFromCart(params)
    }
  }

  getStuffInCart () {
    return this.cart.find((item) => item.stuff_id === this.stuffItem.id)
  }

  getCountStuffInCart () {
    return this.cart.find((item) => item.stuff_id === this.stuffItem.id)?.stuff_count || 0
  }
}
</script>