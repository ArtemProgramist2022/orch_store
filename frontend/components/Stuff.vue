<template>
  <div class="stuff">
    <div
      v-for="item in stuff"
      :key="item.id"
      class="stuff__item stuff-item"
    >
        <!-- window.location.origin -->
      <el-image class="stuff-item__logo" :src="'https://orch.store' + item.stuff_link"></el-image>
      <p class="stuff-item__name">
        {{ item.name }}
      </p>
      <p class="stuff-item__cost">
        {{ item.cost }}
        {{ '&#8381;' }}
      </p>
      <p class="stuff-item__description">
        {{ item.description }}
      </p>
      <div class="stuff-item__total">
        <div class="stuff-item__count">
          {{ item.count_on_warehouse }} шт
        </div>
        <el-button
          v-if="!getStuffInCart(item.id)"
          type="primary"
          size="mini"
          @click="addStuffToCart(item)"
        >
          Купить
        </el-button>
        <el-input-number
          v-else
          :value="getCountStuffInCart(item.id)"
          size="mini"
          :min="0"
          @change="changeCountStuffInCart($event, item.id)"
          class="stuff-item__count-change"
        />
      </div>
    </div>
    <el-empty v-if="!stuff.length" description="Нет товаров"></el-empty>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Prop, Vue } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { StuffItem } from '~/interfaces/stuff'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom'
})
export default class Stuff extends Vue {
  @Prop({ required: true }) stuff!: StuffItem[]

  @Getter('cart/items') cart!: CartItem[]

  @Action('cart/addItemToCart') addItemToCart!: (params: Pick<CartItem, 'stuff_id' | 'stuff_count'>) => Promise<CartItem>
  @Action('cart/updateCountItemInCart') updateCountItemInCart!: (params: Pick<CartItem, 'stuff_count' | 'id'>) => Promise<CartItem>
  @Action('cart/deleteItemFromCart') deleteItemFromCart!: (params: Pick<CartItem, 'id'>) => Promise<CartItem>

  addStuffToCart (item: StuffItem) {
    const params = {
      stuff_id: item.id,
      stuff_count: 1,
    }
    this.addItemToCart(params)
  }

  changeCountStuffInCart (stuff_count: number, id: number) {
    const stuffInCart = this.cart.find((item) => item.stuff_id === id)
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

  getStuffInCart (id: number) {
    return this.cart.find((item) => item.stuff_id === id)
  }

  getCountStuffInCart (id: number) {
    return this.cart.find((item) => item.stuff_id === id)?.stuff_count || 0
  }
}
</script>